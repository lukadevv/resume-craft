const DEFAULT_GRADIENT_ID = 'language-arc-gradient';

export interface LanguageArcProps {
  label: string;
  value: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export function LanguageArc({
  label,
  value,
  size = 160,
  strokeWidth = 12,
  primaryColor = '#F97316',
  secondaryColor = '#FDE68A',
  backgroundColor = '#3F352B',
}: LanguageArcProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;
  const gradientId = `${DEFAULT_GRADIENT_ID}-${label.replace(/\\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <svg width={size} height={size / 2} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="text-2xl font-bold text-white">{Math.round(value)}%</span>
      <span className="text-xs uppercase tracking-wide text-white/80">{label}</span>
    </div>
  );
}
