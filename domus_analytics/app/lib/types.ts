export type ApiResponse<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: { message: string; code?: string };
};

export type GeneralesData = {
  totalSellers: number;
  totalProperties: number;
  publishedProperties: number;
  draftProperties: number;
  archivedProperties: number;
  totalViews: number;
};

export type TopViewedProperty = {
  id: string;
  title: string | null;
  views: number;
  price: number;
  currency: string;
  sellerId: string;
  sellerName: string;
  multimedia: { fileUrl: string; fileType: string }[];
};

export type ViewsMeta = {
  totalViews: number;
  averageViews: number;
};

export type ViewsResponse = ApiResponse<TopViewedProperty[]> & { meta: ViewsMeta };

export type NeighborhoodItem = {
  neighborhood: string;
  count: number;
  avgPrice: number;
};

export type PriceItem = {
  operationType: string;
  propertyType: string;
  count: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
};

export type SellerRankingItem = {
  sellerId: string;
  fullName: string;
  agencyName: string | null;
  email: string;
  propertyCount: number;
  publishedCount: number;
  totalViews: number;
};

export type SellerAppData = {
  generales: GeneralesData;
  views: TopViewedProperty[];
  viewsMeta: ViewsMeta;
  neighborhoods: NeighborhoodItem[];
  prices: PriceItem[];
  sellersRanking: SellerRankingItem[];
};
