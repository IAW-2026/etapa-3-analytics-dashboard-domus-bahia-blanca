import Image from "next/image";
import { ImageOff } from "lucide-react";

const MEDAL_STYLES = [
  { bg: "linear-gradient(135deg, #f5d36b, #e0a93a)", color: "#7a5b12" },
  { bg: "linear-gradient(135deg, #d9dde3, #aeb4bd)", color: "#4b5260" },
  { bg: "linear-gradient(135deg, #e3b08a, #c4824f)", color: "#5a3a1d" },
];

type TopListItem = {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  imageUrl?: string;
  href?: string;
};

export function TopList({
  items,
}: {
  items: TopListItem[];
}) {
  const maxValue = Math.max(...items.map((i) => i.value), 1);

  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => {
        const barWidth = Math.max((item.value / maxValue) * 100, 5);
        const medal = MEDAL_STYLES[i];

        return (
          <li key={item.id}>
            <a
              href={item.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-xl p-3 transition-all duration-150 hover:shadow-md"
              style={{
                background: "var(--bg-card)",
                border: "1.5px solid var(--border)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={
                  medal
                    ? { background: medal.bg, color: medal.color }
                    : {
                        background: "var(--bg-secondary)",
                        color: "var(--text-muted)",
                      }
                }
              >
                {i + 1}
              </div>

              <div
                className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: "var(--bg-secondary)" }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-main line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  {item.subtitle}
                </p>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      background: "var(--primary-soft)",
                    }}
                  />
                </div>
              </div>

              <div
                className="flex items-center gap-1 text-sm font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0"
                style={{
                  background: "var(--primary-muted)",
                  color: "var(--primary)",
                }}
              >
                {item.value.toLocaleString("es-AR")}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
