
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListResponse } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  producApi = 'http://localhost:3500/api/v1/product/productlist';

  constructor(
    private httpClient: HttpClient,
  ) { }


  getProducts(){
    return ['Sarees', 'Shoes', 'Cars', 'Mobiles'];
  }

  getProductList(): Observable<any>{
    return this.httpClient.get<ProductListResponse>(this.producApi);
  }

}
