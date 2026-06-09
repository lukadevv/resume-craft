import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { CertificationBadge } from '@/components/templates/shared/CertificationBadge';

describe('CertificationBadge', () => {
  beforeEach(() => {
    cleanup();
  });

  const sampleCerts = [
    { id: 'c1', name: 'PMP', issuer: 'PMI', date: '2022' },
    { id: 'c2', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2021' },
    { id: 'c3', name: 'Google Cloud Architect', issuer: 'Google', date: '2020' },
  ];

  describe('rendering with data', () => {
    it('renders all certification names', () => {
      render(
        <CertificationBadge certifications={sampleCerts} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('PMP')).toBeInTheDocument();
      expect(
        screen.getByText('AWS Solutions Architect')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Google Cloud Architect')
      ).toBeInTheDocument();
    });

    it('renders all certification issuers', () => {
      render(
        <CertificationBadge certifications={sampleCerts} accentColor="#3ECF8E" />
      );

      expect(screen.getByText('PMI')).toBeInTheDocument();
      expect(screen.getByText('Amazon')).toBeInTheDocument();
      expect(screen.getByText('Google')).toBeInTheDocument();
    });

    it('applies accentColor to badge borders', () => {
      render(
        <CertificationBadge
          certifications={sampleCerts}
          accentColor="#FF6600"
        />
      );

      const badges = screen.getAllByTestId('cert-badge');
      badges.forEach((badge) => {
        expect(badge).toHaveStyle({ borderColor: 'rgb(255, 102, 0)' });
      });
    });

    it('renders each certification as a compact badge element', () => {
      render(
        <CertificationBadge certifications={sampleCerts} accentColor="#3ECF8E" />
      );

      const badges = screen.getAllByTestId('cert-badge');
      expect(badges).toHaveLength(3);
    });
  });

  describe('empty state', () => {
    it('returns null when certifications array is empty', () => {
      const { container } = render(
        <CertificationBadge certifications={[]} accentColor="#3ECF8E" />
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('single certification', () => {
    it('renders a single certification badge correctly', () => {
      render(
        <CertificationBadge
          certifications={[
            { id: 'c1', name: 'CSM', issuer: 'Scrum Alliance', date: '2023' },
          ]}
          accentColor="#3ECF8E"
        />
      );

      expect(screen.getByText('CSM')).toBeInTheDocument();
      expect(screen.getByText('Scrum Alliance')).toBeInTheDocument();
      const badges = screen.getAllByTestId('cert-badge');
      expect(badges).toHaveLength(1);
    });
  });
});
