import { getSkillIcon } from '@/lib/iconRegistry';

interface SkillDotListProps {
  iconKey?: string;
  customIconUrl?: string;
  dots?: number;
  filled?: number;
  label: string;
  accentColor?: string;
}

export function SkillDotList({
  label,
  iconKey,
  customIconUrl,
  dots = 8,
  filled = 0,
  accentColor = '#F97316',
}: SkillDotListProps) {
  const normalizedFilled = Math.min(Math.max(filled, 0), dots);
  const iconElement = customIconUrl ? (
    <img src={customIconUrl} alt={`${label} icon`} className="h-8 w-8 rounded-full object-cover" />
  ) : (
    getSkillIcon(iconKey || label)
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shrink-0">{iconElement}</div>
        <p className="text-sm font-medium text-white">{label}</p>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: dots }).map((_, index) => (
          <span
            key={index}
            data-testid="skill-dot"
            className="h-2.5 flex-1 rounded-full"
            style={{
              backgroundColor: index < normalizedFilled ? accentColor : '#4b3832',
            }}
          />
        ))}
      </div>
    </div>
  );
}
