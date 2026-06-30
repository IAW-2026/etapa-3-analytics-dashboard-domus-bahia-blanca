type Column<T> = {
  key: keyof T;
  label: string;
  width?: number;
  align?: "left" | "right" | "center";
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1.5px solid var(--border)" }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="py-3 px-3 text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: "var(--text-muted)",
                  textAlign: col.align ?? "left",
                  width: col.width,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="transition-colors duration-100"
              style={{ borderBottom: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "var(--bg-secondary)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="py-3 px-3 font-medium"
                  style={{
                    color: "var(--text-main)",
                    textAlign: col.align ?? "left",
                  }}
                >
                  {String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
