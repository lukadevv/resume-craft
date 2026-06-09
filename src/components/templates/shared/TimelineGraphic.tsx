interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

interface TimelineGraphicProps {
  entries: TimelineEntry[];
  accentColor: string;
}

export function TimelineGraphic({
  entries,
  accentColor,
}: TimelineGraphicProps) {
  if (entries.length === 0) return null;

  return (
    <div className="relative pl-6">
      <div
        data-testid="timeline-line"
        className="absolute left-[11px] top-2 bottom-2 w-px"
        style={{ backgroundColor: accentColor }}
      />
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="relative">
            <span
              data-testid="timeline-dot"
              className="absolute -left-6 top-1 h-3 w-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-white">{entry.title}</p>
              <p className="text-xs text-white/70">{entry.subtitle}</p>
              <p className="text-xs text-white/50">{entry.date}</p>
              <p className="text-xs text-white/60">{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
