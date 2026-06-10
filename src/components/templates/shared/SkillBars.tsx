import { TechIcon } from '@/components/ui/TechIcon';

interface SkillBarEntry {
  name: string;
  level: string;
  iconKey?: string;
}

interface SkillBarsProps {
  skills: SkillBarEntry[];
  accentColor: string;
}

const levelWidth: Record<string, string> = {
  expert: '100%',
  advanced: '75%',
  intermediate: '50%',
  beginner: '25%',
};

const levelOrder: Record<string, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

export function SkillBars({ skills, accentColor }: SkillBarsProps) {
  if (skills.length === 0) return null;

  const sorted = [...skills].sort(
    (a, b) => (levelOrder[b.level] ?? 0) - (levelOrder[a.level] ?? 0)
  );

  return (
    <div className="space-y-2">
      {sorted.map((skill) => (
        <div key={skill.name} className="flex items-center gap-3">
          <span
            data-testid="skill-bar-name"
            className="w-24 shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-white/90"
          >
            <TechIcon name={skill.name} iconKey={skill.iconKey} className="flex-shrink-0 w-3.5 h-3.5" />
            {skill.name}
          </span>
          <div className="h-2 flex-1 rounded-full bg-white/10 mr-2">
            <div
              data-testid="skill-bar-fill"
              className="h-2 rounded-full transition-all"
              style={{
                width: levelWidth[skill.level] ?? '0%',
                backgroundColor: accentColor,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
