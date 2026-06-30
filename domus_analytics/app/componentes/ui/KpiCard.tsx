import type { ReactNode } from "react";

export function KpiCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="stat-card animate-fade-up">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
      >
        {icon}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-main tabular-nums tracking-tight">
        {value.toLocaleString("es-AR")}
      </p>
      <p className="text-xs mt-1 font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
    </div>
  );
}
