export enum PageType {
  Product = "product",
  Service = "service",
  Content = "content",
  Unknown = "unknown"
}

export interface ProductPrice {
  amount: number | null;
  currency: string | null;
  unitType: string | null;
  pricePerUnit: number | null;
  totalRatings: number | null;
  averageRating: number | null;
  unitsPerContainer: number | null;
}

export interface ProductIngredient {
  name: string;
  unit: string;
  amount: number;
}

export interface ProductRecommendation {
  reason: string;
  priority: number;
}

export interface NutritionalFact {
  name: string;
  unit: string;
  amount: number;
}

export interface Product {
  name: string | null;
  brand: string | null;
  price: ProductPrice;
  imageUrls: string[];
  productId: string | null;
  is_trusted: boolean;
  productUrl: string | null;
  ingredients: ProductIngredient[];
  recommendation: ProductRecommendation;
  nutritionalFacts: NutritionalFact[];
  productIngredientList: string[];
}

export interface ScrapedData {
  products: Product[];
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  data: ScrapedData | null;
  error: string | null;
  logs?: string[];
}