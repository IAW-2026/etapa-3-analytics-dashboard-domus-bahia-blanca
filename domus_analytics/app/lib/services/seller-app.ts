import "server-only";

import type {
  ApiResponse,
  GeneralesData,
  TopViewedProperty,
  ViewsMeta,
  ViewsResponse,
  NeighborhoodItem,
  PriceItem,
  SellerRankingItem,
  SellerAppData,
} from "@/app/lib/types";

const API_BASE =
  process.env.SELLERAPP_API_URL ??
  "https://proyecto-c-seller-domus-bahia-blanc.vercel.app";
const API_KEY = process.env.SELLERAPP_API_KEY ?? "";

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "X-API-Key": API_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Seller App API error: ${res.status} ${path}`);
  }
  return res.json();
}

export async function getGenerales(): Promise<GeneralesData> {
  const res = await fetchApi<ApiResponse<GeneralesData>>(
    "/api/sellerapp/generales"
  );
  return res.data;
}

export async function getTopViewed(
  limit = 10
): Promise<{ data: TopViewedProperty[]; meta: ViewsMeta }> {
  const res = await fetchApi<ViewsResponse>(`/api/views?limit=${limit}`);
  return { data: res.data, meta: res.meta };
}

export async function getNeighborhoods(
  city?: string
): Promise<NeighborhoodItem[]> {
  const query = city ? `?city=${encodeURIComponent(city)}` : "";
  const res = await fetchApi<ApiResponse<NeighborhoodItem[]>>(
    `/api/analytics/neighborhoods${query}`
  );
  return res.data;
}

export async function getPrices(): Promise<PriceItem[]> {
  const res = await fetchApi<ApiResponse<PriceItem[]>>(
    "/api/analytics/prices"
  );
  return res.data;
}

export async function getSellersRanking(): Promise<SellerRankingItem[]> {
  const res = await fetchApi<ApiResponse<SellerRankingItem[]>>(
    "/api/analytics/sellers-ranking"
  );
  return res.data;
}

export async function getSellerAppData(): Promise<SellerAppData> {
  const [generales, viewsRes, neighborhoods, prices, sellersRanking] =
    await Promise.all([
      getGenerales(),
      getTopViewed(10),
      getNeighborhoods(),
      getPrices(),
      getSellersRanking(),
    ]);

  return {
    generales,
    views: viewsRes.data,
    viewsMeta: viewsRes.meta,
    neighborhoods,
    prices,
    sellersRanking,
  };
}
