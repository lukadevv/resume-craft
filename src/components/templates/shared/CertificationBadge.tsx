interface CertEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface CertificationBadgeProps {
  certifications: CertEntry[];
  accentColor: string;
}

export function CertificationBadge({
  certifications,
  accentColor,
}: CertificationBadgeProps) {
  if (certifications.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {certifications.map((cert) => (
        <div
          key={cert.id}
          data-testid="cert-badge"
          className="inline-flex flex-col items-start rounded-lg border-2 px-3 py-1.5"
          style={{ borderColor: accentColor }}
        >
          <span
            className="text-xs font-semibold"
            style={{ color: accentColor }}
          >
            {cert.name}
          </span>
          <span className="text-[10px] text-white/60">{cert.issuer}</span>
        </div>
      ))}
    </div>
  );
}
