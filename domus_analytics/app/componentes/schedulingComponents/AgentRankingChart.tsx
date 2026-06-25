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
import type { AgentRankingDatum } from "@/app/lib/schedulingAnalytics";
import { cardClassName, chartColors, chartThemeStyle } from "./chartStyles";

type AgentRankingChartProps = {
  monthData: AgentRankingDatum[];
  yearData: AgentRankingDatum[];
};

export default function AgentRankingChart({
  monthData,
  yearData,
}: AgentRankingChartProps) {
  return (
    <section className={cardClassName} style={chartThemeStyle}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-domus-text">
          Agentes con mas visitas completadas
        </h2>
        <p className="text-sm text-domus-textSoft">
          Ranking mensual y anual de turnos completados.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <RankingBlock title="Mes actual" data={monthData} color={chartColors.primary} />
        <RankingBlock title="Año actual" data={yearData} color={chartColors.primarySoft} />
      </div>
    </section>
  );
}

function RankingBlock({
  title,
  data,
  color,
}: {
  title: string;
  data: AgentRankingDatum[];
  color: string;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-domus-textSoft">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 72, bottom: 4 }}
          >
            <CartesianGrid stroke={chartColors.grid} horizontal={false} />
            <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="agentName"
              width={120}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ fill: chartColors.accent }} />
            <Bar
              dataKey="count"
              fill={color}
              radius={[0, 8, 8, 0]}
              animationDuration={850}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
