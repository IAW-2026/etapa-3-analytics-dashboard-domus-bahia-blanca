import SchedulingApp from "@/app/componentes/dashboard/SchedulingApp";
import {
  getAgentCount,
  getCompletedVisitsRanking,
  getHourlyDemand,
  getLastMonthAppointmentsByStatus,
  getWeekdayDemand,
} from "@/app/lib/schedulingAnalytics";

export const dynamic = "force-dynamic";

export default async function SchedulingAppPage() {
  const [
    hourlyDemand,
    weekdayDemand,
    completedVisitsRanking,
    agentCount,
    lastMonthAppointmentsByStatus,
  ] = await Promise.all([
    getHourlyDemand(),
    getWeekdayDemand(),
    getCompletedVisitsRanking(),
    getAgentCount(),
    getLastMonthAppointmentsByStatus(),
  ]);

  return (
    <SchedulingApp
      hourlyDemand={hourlyDemand}
      weekdayDemand={weekdayDemand}
      completedVisitsRanking={completedVisitsRanking}
      agentCount={agentCount}
      lastMonthAppointmentsByStatus={lastMonthAppointmentsByStatus}
    />
  );
}
