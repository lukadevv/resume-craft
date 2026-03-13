import type { Metadata } from 'next';
import './globals.css';

/**
 * Root layout component for the application
 *
 * @param props - Component props
 * @param props.children - Child components
 * @returns Root layout element
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

/**
 * Application metadata configuration
 */
export const metadata: Metadata = {
  title: 'Resume Craft - Professional Resume Builder',
  description: 'Create professional, customizable resumes with AI-powered suggestions',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};
