import "server-only";

export type EstadoTurno =
  | "PENDIENTE_AGENTE"
  | "PRE_ACEPTADO"
  | "CONFIRMADO"
  | "CANCELADO"
  | "COMPLETADO";

export type HourlyDemandDatum = {
  hour: string;
  count: number;
};

export type WeekdayDemandDatum = {
  day: string;
  count: number;
};

export type AgentRankingDatum = {
  agentName: string;
  count: number;
};

export type AppointmentStatusDatum = {
  status: EstadoTurno;
  label: string;
  count: number;
};

type Turno = {
  id: string;
  fechaHoraSolicitada: Date;
  estado: EstadoTurno;
  vendedorId: string;
  compradorId: string;
  propiedadId: string;
  creadoEn: Date;
};

type Agente = {
  id: string;
  nombreCompleto: string;
  inmobiliariaId: string;
};

const ESTADOS_TURNO: EstadoTurno[] = [
  "PENDIENTE_AGENTE",
  "PRE_ACEPTADO",
  "CONFIRMADO",
  "CANCELADO",
  "COMPLETADO",
];

const ESTADO_LABELS: Record<EstadoTurno, string> = {
  PENDIENTE_AGENTE: "Pendiente",
  PRE_ACEPTADO: "Pre aceptado",
  CONFIRMADO: "Confirmado",
  CANCELADO: "Cancelado",
  COMPLETADO: "Completado",
};

const WEEKDAY_LABELS = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

// TODO(endpoint real): GET /api/inmobiliarias/current
// Debe devolver la inmobiliaria activa del usuario autenticado.
async function fetchCurrentRealEstateAgencyId() {
  return "inmo-demo-1";
}

// TODO(endpoint real): GET /api/scheduling/turnos?inmobiliariaId={inmobiliariaId}
// Debe devolver los turnos asociados a la inmobiliaria activa.
async function fetchTurnosByAgency(inmobiliariaId: string): Promise<Turno[]> {
  void inmobiliariaId;

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  return [
    createTurno("t-1", thisYear, thisMonth, 3, 9, "COMPLETADO", "a-1"),
    createTurno("t-2", thisYear, thisMonth, 4, 10, "CONFIRMADO", "a-2"),
    createTurno("t-3", thisYear, thisMonth, 5, 10, "COMPLETADO", "a-1"),
    createTurno("t-4", thisYear, thisMonth, 6, 11, "PENDIENTE_AGENTE", "a-3"),
    createTurno("t-5", thisYear, thisMonth, 7, 14, "COMPLETADO", "a-4"),
    createTurno("t-6", thisYear, thisMonth, 8, 15, "CANCELADO", "a-2"),
    createTurno("t-7", thisYear, thisMonth, 9, 17, "PRE_ACEPTADO", "a-5"),
    createTurno("t-8", thisYear, thisMonth, 10, 9, "COMPLETADO", "a-3"),
    createTurno("t-9", thisYear, thisMonth, 11, 10, "COMPLETADO", "a-3"),
    createTurno("t-10", thisYear, thisMonth, 12, 18, "CONFIRMADO", "a-2"),
    createTurno("t-11", thisYear, thisMonth - 1, 23, 12, "COMPLETADO", "a-1"),
    createTurno("t-12", thisYear, thisMonth - 1, 24, 16, "CANCELADO", "a-4"),
    createTurno("t-13", thisYear, thisMonth - 2, 15, 9, "COMPLETADO", "a-5"),
    createTurno("t-14", thisYear, thisMonth - 3, 16, 11, "COMPLETADO", "a-2"),
    createTurno("t-15", thisYear, thisMonth - 4, 17, 14, "COMPLETADO", "a-3"),
    createTurno("t-16", thisYear, thisMonth - 5, 18, 15, "COMPLETADO", "a-1"),
    createTurno("t-17", thisYear, thisMonth - 6, 19, 10, "COMPLETADO", "a-4"),
    createTurno("t-18", thisYear, thisMonth - 7, 20, 13, "COMPLETADO", "a-5"),
    createTurno("t-19", thisYear, thisMonth - 8, 21, 9, "COMPLETADO", "a-2"),
    createTurno("t-20", thisYear, thisMonth - 9, 22, 18, "COMPLETADO", "a-3"),
  ];
}

// TODO(endpoint real): GET /api/scheduling/agentes?inmobiliariaId={inmobiliariaId}
// Debe devolver los agentes de la inmobiliaria activa.
async function fetchAgentesByAgency(inmobiliariaId: string): Promise<Agente[]> {
  return [
    { id: "a-1", nombreCompleto: "Lucia Fernandez", inmobiliariaId },
    { id: "a-2", nombreCompleto: "Mateo Alvarez", inmobiliariaId },
    { id: "a-3", nombreCompleto: "Valentina Rios", inmobiliariaId },
    { id: "a-4", nombreCompleto: "Santiago Molina", inmobiliariaId },
    { id: "a-5", nombreCompleto: "Camila Torres", inmobiliariaId },
  ];
}

export async function getHourlyDemand(): Promise<HourlyDemandDatum[]> {
  const inmobiliariaId = await fetchCurrentRealEstateAgencyId();
  const turnos = await fetchTurnosByAgency(inmobiliariaId);
  const counts = new Map<number, number>();

  for (const turno of turnos) {
    const hour = turno.fechaHoraSolicitada.getHours();
    counts.set(hour, (counts.get(hour) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort(([leftHour], [rightHour]) => leftHour - rightHour)
    .map(([hour, count]) => ({
      hour: `${String(hour).padStart(2, "0")}:00`,
      count,
    }));
}

export async function getWeekdayDemand(): Promise<WeekdayDemandDatum[]> {
  const inmobiliariaId = await fetchCurrentRealEstateAgencyId();
  const turnos = await fetchTurnosByAgency(inmobiliariaId);
  const counts = new Map<number, number>();

  for (const turno of turnos) {
    const weekday = turno.fechaHoraSolicitada.getDay();
    counts.set(weekday, (counts.get(weekday) ?? 0) + 1);
  }

  return [1, 2, 3, 4, 5, 6, 0].map((weekday) => ({
    day: WEEKDAY_LABELS[weekday],
    count: counts.get(weekday) ?? 0,
  }));
}

export async function getCompletedVisitsRanking() {
  const inmobiliariaId = await fetchCurrentRealEstateAgencyId();
  const [turnos, agentes] = await Promise.all([
    fetchTurnosByAgency(inmobiliariaId),
    fetchAgentesByAgency(inmobiliariaId),
  ]);

  return {
    month: getTopCompletedVisitsByAgent(turnos, agentes, "month"),
    year: getTopCompletedVisitsByAgent(turnos, agentes, "year"),
  };
}

export async function getAgentCount(): Promise<number> {
  const inmobiliariaId = await fetchCurrentRealEstateAgencyId();
  const agentes = await fetchAgentesByAgency(inmobiliariaId);

  return agentes.length;
}

export async function getLastMonthAppointmentsByStatus(): Promise<
  AppointmentStatusDatum[]
> {
  const inmobiliariaId = await fetchCurrentRealEstateAgencyId();
  const turnos = await fetchTurnosByAgency(inmobiliariaId);
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth() - 1);
  const counts = new Map<EstadoTurno, number>();

  for (const turno of turnos) {
    if (turno.fechaHoraSolicitada >= lastMonth && turno.fechaHoraSolicitada <= now) {
      counts.set(turno.estado, (counts.get(turno.estado) ?? 0) + 1);
    }
  }

  return ESTADOS_TURNO.map((status) => ({
    status,
    label: ESTADO_LABELS[status],
    count: counts.get(status) ?? 0,
  }));
}

function getTopCompletedVisitsByAgent(
  turnos: Turno[],
  agentes: Agente[],
  period: "month" | "year",
): AgentRankingDatum[] {
  const now = new Date();
  const counts = new Map<string, number>();
  const agentNames = new Map(
    agentes.map((agente) => [agente.id, agente.nombreCompleto]),
  );

  for (const turno of turnos) {
    if (turno.estado !== "COMPLETADO") {
      continue;
    }

    const sameYear = turno.fechaHoraSolicitada.getFullYear() === now.getFullYear();
    const sameMonth = turno.fechaHoraSolicitada.getMonth() === now.getMonth();

    if (!sameYear || (period === "month" && !sameMonth)) {
      continue;
    }

    counts.set(turno.vendedorId, (counts.get(turno.vendedorId) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([agentId, count]) => ({
      agentName: agentNames.get(agentId) ?? "Agente sin asignar",
      count,
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 5);
}

function createTurno(
  id: string,
  year: number,
  month: number,
  day: number,
  hour: number,
  estado: EstadoTurno,
  vendedorId: string,
): Turno {
  const fechaHoraSolicitada = new Date(year, month, day, hour);

  return {
    id,
    fechaHoraSolicitada,
    estado,
    vendedorId,
    compradorId: `comprador-${id}`,
    propiedadId: `propiedad-${id}`,
    creadoEn: fechaHoraSolicitada,
  };
}
