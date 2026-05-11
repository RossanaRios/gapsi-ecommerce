// Domain types for the Walmart product API

export interface Product {
  usItemId: string;
  name: string;
  price: number;
  imageUrl: string;
  shortDescription?: string;
}

export interface SearchResult {
  products: Product[];
  totalResults: number;
  currentPage: number;
}

export interface SearchParams {
  keyword: string;
  page: number;
}
