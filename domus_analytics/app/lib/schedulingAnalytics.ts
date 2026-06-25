import "server-only";
import { cache } from "react";

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

export type TopVisitedPropertyDatum = {
  propertyId: string;
  title: string;
  address: string | null;
  visits: number;
};

type Turno = {
  id: string;
  fechaHoraSolicitada: Date | null;
  estado: EstadoTurno;
  vendedorId: string;
  compradorId: string;
  propiedadId: string;
  propiedadTitulo: string | null;
  propiedadDireccion: string | null;
  agenteId: string | null;
  creadoEn: Date;
};

type Agente = {
  id: string;
  nombreCompleto: string;
  inmobiliariaId: string | null;
};

type Seller = {
  id: string;
  fullName?: string | null;
  agencyName?: string | null;
  email?: string | null;
};

type ApiResponse<T> = {
  success?: boolean;
  data: T;
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

function readEnvValue(...values: (string | undefined)[]) {
  return values.find((value) => {
    const normalized = value?.trim().toLowerCase();
    return normalized && normalized !== "undefined" && normalized !== "null";
  })?.trim();
}

function readEnvUrl(defaultUrl: string, ...values: (string | undefined)[]) {
  const value = readEnvValue(...values) ?? defaultUrl;
  return value.replace(/\/$/, "");
}

function buildApiUrl(baseUrl: string, path: string) {
  return new URL(path, `${baseUrl}/`).toString();
}

function getSchedulingConfig() {
  return {
    baseUrl: readEnvUrl(
      "https://proyecto-c-shipping-domus-bahia.vercel.app",
      process.env.SCHEDULING_APP_BASE_URL,
    ),
    apiKey: readEnvValue(process.env.SCHEDULING_APP_API_KEY),
  };
}

function getSellerConfig() {
  return {
    baseUrl: readEnvUrl(
      "https://proyecto-c-seller-domus-bahia-blanc.vercel.app",
      process.env.SELLERAPP_API_URL,
    ),
    apiKey: readEnvValue(process.env.SELLERAPP_API_KEY),
  };
}

async function parseJsonResponse<T>(response: Response, label: string): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${label} error ${response.status}: ${text.slice(0, 200)}`);
  }

  if (!text) {
    return null as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`${label} no devolvio JSON: ${text.slice(0, 200)}`);
  }
}

async function schedulingFetch<T>(path: string): Promise<T> {
  const { baseUrl, apiKey } = getSchedulingConfig();

  if (!apiKey) {
    throw new Error("Falta configurar SCHEDULING_APP_API_KEY");
  }

  const response = await fetch(buildApiUrl(baseUrl, path), {
    headers: {
      "X-API-Key": apiKey,
    },
    cache: "no-store",
  });

  return parseJsonResponse<T>(response, "Scheduling API");
}

async function sellerFetch<T>(path: string): Promise<T> {
  const { baseUrl, apiKey } = getSellerConfig();

  if (!apiKey) {
    throw new Error("Falta configurar SELLERAPP_API_KEY");
  }

  const response = await fetch(buildApiUrl(baseUrl, path), {
    headers: {
      "X-API-Key": apiKey,
    },
    cache: "no-store",
  });

  return parseJsonResponse<T>(response, "Seller App API");
}

function parseDate(value: unknown) {
  if (typeof value !== "string" && !(value instanceof Date)) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeTurno(raw: unknown): Turno {
  const item = raw as Partial<Turno> & {
    fechaHoraSolicitada?: string | Date | null;
    creadoEn?: string | Date | null;
    tituloPropiedad?: string | null;
    direccion?: string | null;
    propiedad?: {
      nombrePropiedad?: string | null;
      direccion?: string | null;
    } | null;
  };

  return {
    id: item.id ?? "sin-id",
    fechaHoraSolicitada: parseDate(item.fechaHoraSolicitada),
    estado: item.estado ?? "PENDIENTE_AGENTE",
    vendedorId: item.vendedorId ?? "sin-vendedor",
    compradorId: item.compradorId ?? "sin-comprador",
    propiedadId: item.propiedadId ?? "sin-propiedad",
    propiedadTitulo:
      item.propiedadTitulo ??
      item.tituloPropiedad ??
      item.propiedad?.nombrePropiedad ??
      null,
    propiedadDireccion:
      item.propiedadDireccion ??
      item.direccion ??
      item.propiedad?.direccion ??
      null,
    agenteId: item.agenteId ?? null,
    creadoEn: parseDate(item.creadoEn) ?? new Date(0),
  };
}

function normalizeAgente(raw: unknown): Agente {
  const item = raw as Partial<Agente> & { vendedorId?: string | null };

  return {
    id: item.id ?? "sin-id",
    nombreCompleto: item.nombreCompleto ?? "Agente sin nombre",
    inmobiliariaId: item.inmobiliariaId ?? item.vendedorId ?? null,
  };
}

async function fetchSellerAgencies(): Promise<Seller[]> {
  const response = await sellerFetch<ApiResponse<Seller[]>>("/api/sellers");
  return response.data;
}

async function fetchAdminTurnos(): Promise<Turno[]> {
  const payload = await schedulingFetch<unknown>("/api/admin/turnos");
  const data =
    payload &&
    typeof payload === "object" &&
    "data" in payload
      ? (payload as { data: unknown }).data
      : payload;

  return Array.isArray(data) ? data.map(normalizeTurno) : [];
}

async function fetchAgentesByAgency(inmobiliariaId: string): Promise<Agente[]> {
  const params = new URLSearchParams({
    inmobiliariaId,
    estado: "PENDIENTE,ACEPTADO",
  });
  const payload = await schedulingFetch<unknown[]>(
    `/api/agentes/estado?${params.toString()}`,
  );

  return Array.isArray(payload) ? payload.map(normalizeAgente) : [];
}

const fetchAllTurnos = cache(async (): Promise<Turno[]> => {
  return fetchAdminTurnos();
});

const fetchAllAgentes = cache(async (): Promise<Agente[]> => {
  const sellers = await fetchSellerAgencies();
  const agentesByAgency = await Promise.all(
    sellers.map((seller) => fetchAgentesByAgency(seller.id)),
  );

  return agentesByAgency.flat();
});

export async function getHourlyDemand(): Promise<HourlyDemandDatum[]> {
  const turnos = await fetchAllTurnos();
  const counts = new Map<number, number>();

  for (const turno of turnos) {
    if (!turno.fechaHoraSolicitada) continue;

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
  const turnos = await fetchAllTurnos();
  const counts = new Map<number, number>();

  for (const turno of turnos) {
    if (!turno.fechaHoraSolicitada) continue;

    const weekday = turno.fechaHoraSolicitada.getDay();
    counts.set(weekday, (counts.get(weekday) ?? 0) + 1);
  }

  return [1, 2, 3, 4, 5, 6, 0].map((weekday) => ({
    day: WEEKDAY_LABELS[weekday],
    count: counts.get(weekday) ?? 0,
  }));
}

export async function getCompletedVisitsRanking() {
  const [turnos, agentes] = await Promise.all([
    fetchAllTurnos(),
    fetchAllAgentes(),
  ]);

  return {
    month: getTopCompletedVisitsByAgent(turnos, agentes, "month"),
    year: getTopCompletedVisitsByAgent(turnos, agentes, "year"),
  };
}

export async function getAgentCount(): Promise<number> {
  const agentes = await fetchAllAgentes();

  return agentes.length;
}

export async function getLastMonthAppointmentsByStatus(): Promise<
  AppointmentStatusDatum[]
> {
  const turnos = await fetchAllTurnos();
  const now = new Date();
  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth() - 1);
  const counts = new Map<EstadoTurno, number>();

  for (const turno of turnos) {
    if (!turno.fechaHoraSolicitada) continue;

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

export async function getTopVisitedProperties(): Promise<TopVisitedPropertyDatum[]> {
  const turnos = await fetchAllTurnos();
  const properties = new Map<
    string,
    { title: string; address: string | null; visits: number }
  >();

  for (const turno of turnos) {
    const current = properties.get(turno.propiedadId);

    if (current) {
      current.visits += 1;
      continue;
    }

    properties.set(turno.propiedadId, {
      title: turno.propiedadTitulo ?? turno.propiedadId,
      address: turno.propiedadDireccion,
      visits: 1,
    });
  }

  return Array.from(properties.entries())
    .map(([propertyId, property]) => ({
      propertyId,
      ...property,
    }))
    .sort((left, right) => right.visits - left.visits)
    .slice(0, 5);
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
    if (turno.estado !== "COMPLETADO" || !turno.fechaHoraSolicitada) {
      continue;
    }

    const sameYear = turno.fechaHoraSolicitada.getFullYear() === now.getFullYear();
    const sameMonth = turno.fechaHoraSolicitada.getMonth() === now.getMonth();

    if (!sameYear || (period === "month" && !sameMonth)) {
      continue;
    }

    if (!turno.agenteId) {
      continue;
    }

    const agentId = turno.agenteId;
    counts.set(agentId, (counts.get(agentId) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([agentId, count]) => ({
      agentName: agentNames.get(agentId) ?? "Agente sin asignar",
      count,
    }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 5);
}

