"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeekdayDemandDatum } from "@/app/lib/schedulingAnalytics";
import { cardClassName, chartColors, chartThemeStyle } from "./chartStyles";

type WeekdayDemandChartProps = {
  data: WeekdayDemandDatum[];
};

export default function WeekdayDemandChart({ data }: WeekdayDemandChartProps) {
  return (
    <section className={cardClassName} style={chartThemeStyle}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-domus-text">
          Dias con mas visitas
        </h2>
        <p className="text-sm text-domus-textSoft">
          Turnos agrupados por dia de la semana.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={chartColors.grid} vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: chartColors.accent }} />
            <Bar
              dataKey="count"
              fill={chartColors.primarySoft}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
