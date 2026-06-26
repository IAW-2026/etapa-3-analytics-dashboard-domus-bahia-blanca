"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { AppointmentStatusDatum } from "@/app/lib/schedulingAnalytics";
import { cardClassName, chartColors, chartThemeStyle } from "./chartStyles";

type AppointmentStatusPieChartProps = {
  data: AppointmentStatusDatum[];
};

const STATUS_COLORS = [
  chartColors.primary,
  chartColors.primarySoft,
  chartColors.primaryMuted,
  chartColors.terracotta,
  chartColors.brown,
];

export default function AppointmentStatusPieChart({
  data,
}: AppointmentStatusPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className={cardClassName} style={chartThemeStyle}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-domus-text">
          Turnos del ultimo mes
        </h2>
        <p className="text-sm text-domus-textSoft">
          Distribucion por estado de la visita.
        </p>
      </div>

      <div className="relative h-72 sm:h-80">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-2/3 text-center">
          <p className="text-2xl font-bold leading-none text-domus-text sm:text-3xl">
            {total}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-domus-textSoft sm:text-xs">
            turnos
          </p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius="45%"
              outerRadius="72%"
              paddingAngle={3}
              animationDuration={850}
              animationEasing="ease-out"
            >
              {data.map((item, index) => (
                <Cell
                  key={item.status}
                  fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
