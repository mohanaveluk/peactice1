import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductListResponse } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];

  productListResponse: ProductListResponse = {};
  errorMessage: any = "";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    //this.displayProducts();
    this.getProductList();
  }


  displayProducts(){
    this.products = this.productService.getProducts();
  }

  getProductList(){
    this.errorMessage = '';
    // Observer
    var response = this.productService.getProductList()
    .subscribe(httpResponse => {

      this.productListResponse = httpResponse;

      if(this.productListResponse.status === 'true'){
        this.products = this.productListResponse.products;
      }
      else{
        this.errorMessage = this.productListResponse.message;
      }
    },

    (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

}
