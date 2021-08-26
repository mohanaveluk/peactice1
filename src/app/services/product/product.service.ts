
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map, switchMap, filter, shareReplay, scan } from 'rxjs/operators';
import { ProductListResponse } from './product.model';

@Injectable()
export class ProductService {

  producApi = 'http://localhost:3000/api/v1/product/all';
  updateProducApi = 'http://localhost:3000/api/v1/product/update';

  private productSubject = new Subject<ProductListResponse>();
  productSubject$ = this.productSubject.asObservable();

  /*
  product$ = this.productSubject$.pipe(
    switchMap(prodId => this.httpClient.get<ProductListResponse[]>(this.producApi).pipe(
      tap(response => console.log(response)),
      catchError(this.handleError)
    ))
    );
  */
  constructor(
    private httpClient: HttpClient,
  ) { }


  getProducts(){
    //return ['Sarees', 'Shoes', 'Cars', 'Mobiles'];
    //this.productSubject$ =
  }

  getProductList(): Observable<any>{
    return this.httpClient.get<ProductListResponse>(this.producApi);
  }

  updateProduct(productInfo: any) : Observable<any>{
    return this.httpClient.post<object>(this.updateProducApi, productInfo);
  }

  private handleError(err: any): Observable<never> {
    return throwError(err);
  }


}
