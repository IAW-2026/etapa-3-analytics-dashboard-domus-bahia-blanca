"use client";

import AgentCountCard from "@/app/componentes/schedulingComponents/AgentCountCard";
import AgentRankingChart from "@/app/componentes/schedulingComponents/AgentRankingChart";
import AppointmentStatusPieChart from "@/app/componentes/schedulingComponents/AppointmentStatusPieChart";
import HourlyDemandChart from "@/app/componentes/schedulingComponents/HourlyDemandChart";
import TopVisitedPropertiesCard from "@/app/componentes/schedulingComponents/TopVisitedPropertiesCard";
import WeekdayDemandChart from "@/app/componentes/schedulingComponents/WeekdayDemandChart";

import type {
  AgentRankingDatum,
  AppointmentStatusDatum,
  HourlyDemandDatum,
  TopVisitedPropertyDatum,
  WeekdayDemandDatum,
} from "@/app/lib/schedulingAnalytics";

type SchedulingAppProps = {
  hourlyDemand: HourlyDemandDatum[];
  weekdayDemand: WeekdayDemandDatum[];
  completedVisitsRanking: {
    month: AgentRankingDatum[];
    year: AgentRankingDatum[];
  };
  agentCount: number;
  lastMonthAppointmentsByStatus: AppointmentStatusDatum[];
  topVisitedProperties: TopVisitedPropertyDatum[];
};

export default function SchedulingApp({
  hourlyDemand,
  weekdayDemand,
  completedVisitsRanking,
  agentCount,
  lastMonthAppointmentsByStatus,
  topVisitedProperties,
}: SchedulingAppProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-domus-primary">
          Scheduling app
        </p>
        <h1 className="mt-2 text-3xl font-bold text-domus-text">
          Panel de analiticas de visitas
        </h1>
        <p className="mt-2 max-w-3xl text-domus-textSoft">
          Metricas operativas para entender demanda horaria, dias fuertes,
          desempeno de agentes y estado reciente de los turnos.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <HourlyDemandChart data={hourlyDemand} />
        <WeekdayDemandChart data={weekdayDemand} />
      </div>

      <AgentRankingChart
        monthData={completedVisitsRanking.month}
        yearData={completedVisitsRanking.year}
      />

      <TopVisitedPropertiesCard data={topVisitedProperties} />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <AgentCountCard count={agentCount} />
        <AppointmentStatusPieChart data={lastMonthAppointmentsByStatus} />
      </div>
    </div>
  );
}
