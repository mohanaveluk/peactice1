export interface ProductListResponse {
  status?: string;
  message?: string;
  products?: ProductList[]
}

export interface ProductList{
  productId?: number,
  productName?: string,
  category?: string,
  price?: number
}

