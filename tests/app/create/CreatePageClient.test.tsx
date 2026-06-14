import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { useResumeStore } from '@/store/resume';

// scrollIntoView isn't implemented in jsdom
Element.prototype.scrollIntoView = vi.fn();

// Mock Header since it now uses useTranslations from next-intl
vi.mock('@/components/layout/Header', () => ({
  Header: () => React.createElement('header', { 'data-testid': 'mock-header' }, 'Header'),
}));

// Mock Footer similarly
vi.mock('@/components/layout/Footer', () => ({
  Footer: () => React.createElement('footer', { 'data-testid': 'mock-footer' }, 'Footer'),
}));

// Mock next-intl for components using useTranslations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams(''),
  usePathname: () => '/create',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  }) => (
    <a href={typeof href === 'string' ? href : href.pathname ?? '#'} {...props}>
      {children}
    </a>
  ),
}));

// Override the global next-view-transitions mock so useTransitionRouter
// uses this test file's mockPush for navigation assertions.
vi.mock('next-view-transitions', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
  ViewTransitions: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useTransitionRouter: () => ({ push: mockPush }),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn(), themes: ['light', 'dark'] }),
}));

describe('CreatePageClient v2', () => {
  beforeEach(() => {
    useResumeStore.setState({ resumes: [], currentResume: null });
    useResumeStore.persist.clearStorage();
    mockPush.mockClear();
    vi.setConfig({ testTimeout: 15000 });
  });

  afterEach(() => {
    cleanup();
  });

  // We import dynamically after mocks are set up
  async function renderPage() {
    const { CreatePageClient } = await import('@/app/[locale]/create/CreatePageClient');
    return render(<CreatePageClient />);
  }

  it('renders a resume name input with label and placeholder', { timeout: 15000 }, async () => {
    await renderPage();
    const nameInput = screen.getByLabelText('Resume Name');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('placeholder', 'e.g. Software Engineer Resume');
    expect(nameInput).toHaveValue('My Resume');
  });

  it('shows "Start Building" button (not "Create Resume") in the preview panel', { timeout: 15000 }, async () => {
    await renderPage();
    // The "Start Building" button is in the main content area
    const buttons = screen.getAllByRole('button', { name: /start building/i });
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeInTheDocument();
  });

  it('has Start Building button enabled by default with pre-filled name', async () => {
    await renderPage();
    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];
    expect(nameInput).toHaveValue('My Resume');
    expect(button).toBeEnabled();
  });

  it('disables Start Building button when name is cleared', async () => {
    await renderPage();

    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];

    fireEvent.change(nameInput, { target: { value: '' } });

    expect(button).toBeDisabled();
  });

  it('re-enables Start Building button when user types a new name after clearing', async () => {
    await renderPage();

    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(button).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'My Developer Resume' } });
    expect(nameInput).toHaveValue('My Developer Resume');
    expect(button).toBeEnabled();
  });

  it('treats whitespace-only name as empty — button remains disabled', async () => {
    await renderPage();

    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];

    fireEvent.change(nameInput, { target: { value: '   ' } });

    expect(button).toBeDisabled();
  });

  it('calls createResume and navigates to wizard when Start Building is clicked with a name', async () => {
    await renderPage();

    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];

    fireEvent.change(nameInput, { target: { value: 'Software Engineer CV' } });
    fireEvent.click(button);

    // Verify a resume was created in the store
    const state = useResumeStore.getState();
    expect(state.resumes).toHaveLength(1);
    const newResume = state.resumes[0];
    expect(newResume.name).toBe('Software Engineer CV');
    expect(newResume.template).toBe('modern');

    // Verify navigation to wizard
    expect(mockPush).toHaveBeenCalledWith(`/resume/wizard?id=${newResume.id}`);
  });

  it('does NOT render EditDetailsPanel modal', async () => {
    await renderPage();
    // The modal header text "Edit Resume Details" should not appear
    const modalHeaders = screen.queryAllByText(/edit resume details/i);
    expect(modalHeaders).toHaveLength(0);
  });

  it('renders template cards', async () => {
    await renderPage();

    // There should be many template name headings
    const modernCards = screen.getAllByText('Modern');
    expect(modernCards.length).toBeGreaterThan(0);
  });

  it('disables button when name becomes empty after being filled and cleared', async () => {
    await renderPage();

    const nameInput = screen.getByLabelText('Resume Name');
    const button = screen.getAllByRole('button', { name: /start building/i })[0];

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    expect(button).toBeEnabled();

    fireEvent.change(nameInput, { target: { value: '' } });
    expect(button).toBeDisabled();
  });
});
