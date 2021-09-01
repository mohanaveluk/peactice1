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
  category_name?: string;
  price?: number
}


export interface ProductUpdateResponse{
  status?: string;
  message?: string;
  result?: string;
}

export interface CategoryListResponse {
  status?: string;
  message?: string;
  result?: CategoryList[]
}

export interface CategoryList{
  id?: number,
  category_name?: string,

}
