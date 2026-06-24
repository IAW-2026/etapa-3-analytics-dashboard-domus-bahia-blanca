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
  "hsl(var(--primary) / 0.82)",
  "hsl(var(--primary) / 0.56)",
];

export default function AppointmentStatusPieChart({
  data,
}: AppointmentStatusPieChartProps) {
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

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              innerRadius={58}
              outerRadius={96}
              paddingAngle={3}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.status}
                  fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
