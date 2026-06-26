import type { ReactNode } from "react";

export function SectionCard({
  title,
  icon,
  subtitle,
  children,
}: {
  title: string;
  icon?: ReactNode;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      {icon && (
        <div
          className="px-6 py-4 flex items-center justify-between border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--primary)" }}>{icon}</span>
            <h2 className="text-base font-bold text-main">{title}</h2>
          </div>
          {subtitle && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "var(--primary-muted)",
                color: "var(--primary)",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
