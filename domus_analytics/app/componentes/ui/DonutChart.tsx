type DonutItem = {
  label: string;
  value: number;
  color: string;
};

export function DonutChart({ items }: { items: DonutItem[] }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const segments = items.map((item, i) => {
    const cumulativePercent = items
      .slice(0, i)
      .reduce((s, prev) => s + prev.value / total, 0);
    return { ...item, percent: item.value / total, rotation: cumulativePercent * 360 };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width={160} height={160} viewBox="0 0 160 160" className="-rotate-90">
        <circle
          cx={80}
          cy={80}
          r={radius}
          fill="none"
          stroke="var(--bg-secondary)"
          strokeWidth={28}
        />
        {segments.map((seg) => {
          const strokeDasharray = `${seg.percent * circumference} ${circumference}`;
          return (
            <circle
              key={seg.label}
              cx={80}
              cy={80}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={28}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={0}
              transform={`rotate(${seg.rotation} 80 80)`}
              className="transition-all duration-700"
            />
          );
        })}
      </svg>

      <div className="flex flex-wrap gap-4 justify-center">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-main font-medium">{item.label}</span>
            <span style={{ color: "var(--text-secondary)" }}>
              {item.value.toLocaleString("es-AR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
