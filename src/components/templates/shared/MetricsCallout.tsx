interface MetricEntry {
  label: string;
  value: string;
}

interface MetricsCalloutProps {
  metrics: MetricEntry[];
  accentColor: string;
}

export function MetricsCallout({ metrics, accentColor }: MetricsCalloutProps) {
  if (metrics.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          data-testid="metric-card"
          className="flex flex-col items-center rounded-lg border-2 px-4 py-3"
          style={{ borderColor: accentColor }}
        >
          <span
            data-testid="metric-value"
            className="text-2xl font-bold"
            style={{ color: accentColor }}
          >
            {metric.value}
          </span>
          <span className="text-xs text-white/70">{metric.label}</span>
        </div>
      ))}
    </div>
  );
}
