import "server-only";

const BASE_URL = process.env.BUYER_APP_BASE_URL || "";
const API_KEY = process.env.BUYER_APP_API_KEY || "";

export async function fetchBuyerAnalyticsApi() {
  const res = await fetch(`${BASE_URL}/api/external/analytics`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error obteniendo analíticas de la Buyer App");
  }

  return res.json();
}