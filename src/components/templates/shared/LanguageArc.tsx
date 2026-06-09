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
  size = 80,
  strokeWidth = 6,
  primaryColor = '#F97316',
  secondaryColor = '#FDE68A',
  backgroundColor = '#3F352B',
}: LanguageArcProps) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const filledLength = (Math.min(Math.max(value, 0), 100) / 100) * circumference;
  const gradientId = `${DEFAULT_GRADIENT_ID}-${label.replace(/\\s+/g, '-').toLowerCase()}`;

  const arcPath = `M ${cx - radius},${cy} A ${radius},${radius} 0 0,1 ${cx + radius},${cy}`;

  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <svg width={size} height={size / 2 + strokeWidth / 2} viewBox={`0 0 ${size} ${size / 2 + strokeWidth / 2}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        <path d={arcPath} fill="none" stroke={backgroundColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path
          d={arcPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${filledLength} ${circumference - filledLength}`}
          strokeDashoffset={0}
        />
      </svg>
      <span className="text-xs font-bold text-white">{Math.round(value)}%</span>
      <span className="text-[10px] uppercase tracking-wide text-white/70">{label}</span>
    </div>
  );
}
