export interface ProductListResponse {
  status?: string;
  message?: string;
  products?: ProductList[]
}

export interface ProductList{
  productId?: number,
  productName?: string,
  prodcutDescription?: string;
  category?: string,
  price?: number
}


export interface ProductUpdateResponse{
  status?: string;
  message?: string;
  result?: string;
}
