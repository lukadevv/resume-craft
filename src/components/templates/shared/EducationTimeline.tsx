import { Education } from '@/types/resume';

interface EducationTimelineProps {
  entries: Education[];
  accentColor?: string;
}

export function EducationTimeline({ entries, accentColor = '#F97316' }: EducationTimelineProps) {
  return (
    <div className="relative space-y-6 pl-4 text-white/90">
      <div className="absolute left-1 top-0 bottom-0 w-px bg-white/30" />
      {entries.map((entry, index) => (
        <div key={entry.id} className="relative flex flex-col gap-1">
          <span
            className="absolute -left-4 top-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <p className="text-sm font-semibold text-white">{entry.degree}</p>
          <p className="text-xs text-white/70">
            {entry.institution} • {entry.location}
          </p>
          <p className="text-xs text-white/50">
            {entry.startDate} - {entry.current ? 'Present' : entry.endDate}
          </p>
        </div>
      ))}
    </div>
  );
}
