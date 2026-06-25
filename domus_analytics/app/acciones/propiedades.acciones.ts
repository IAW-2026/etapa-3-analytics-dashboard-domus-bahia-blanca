"use server";

const SELLERAPP_API = process.env.SELLERAPP_API_URL!;
const API_KEY = process.env.SELLERAPP_API_KEY!;

export async function getAllPropiedadesParaMapaAction(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${SELLERAPP_API}/api/properties/all`, {
      headers: { "X-API-Key": API_KEY },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    const json = await res.json();
    const map: Record<string, string> = {};

    json.data.forEach((p: any) => {
      map[p.id] = p.title ?? p.address ?? "Propiedad sin nombre";
    });

    return map;
  } catch (error) {
    console.error("Error armando mapa de propiedades:", error);
    return {};
  }
}