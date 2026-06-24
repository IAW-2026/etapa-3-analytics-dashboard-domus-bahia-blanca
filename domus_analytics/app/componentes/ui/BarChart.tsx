export function BarChart<T extends Record<string, string | number>>({
  data,
  labelKey,
  valueKey,
  valueFormat,
  dense,
}: {
  data: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  valueFormat?: (value: number) => string;
  dense?: boolean;
}) {
  const maxValue = Math.max(...data.map((d) => Number(d[valueKey])), 1);

  return (
    <div className={dense ? "space-y-1.5" : "space-y-3"}>
      {data.map((item, i) => {
        const val = Number(item[valueKey]);
        return (
          <div key={i} className={dense ? "" : "space-y-1"}>
            <div className="flex justify-between gap-2">
              <span
                className={`font-medium text-main truncate ${
                  dense ? "text-[11px]" : "text-xs"
                }`}
              >
                {String(item[labelKey])}
              </span>
              <span
                className="flex-shrink-0"
                style={{ color: "var(--text-secondary)", fontSize: dense ? 11 : 12 }}
              >
                {valueFormat ? valueFormat(val) : val.toLocaleString("es-AR")}
              </span>
            </div>
            <div
              className="rounded-full overflow-hidden"
              style={{
                background: "var(--bg-secondary)",
                height: dense ? 6 : 8,
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(val / maxValue) * 100}%`,
                  background: "var(--primary)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
