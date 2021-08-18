import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(){
    return ['Sarees', 'Shoes', 'Cars', 'Mobiles'];
  }

  
}
