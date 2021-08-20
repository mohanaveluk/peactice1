import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductList, ProductListResponse } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];
  productList: ProductList[] = [];

  productListResponse: ProductListResponse = {};
  errorMessage: any = "";

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    //this.displayProducts();
    this.getProductList();
  }


  displayProducts(){
    //this.products = this.productService.getProducts();
  }

  getProductList(){
    this.errorMessage = '';
    this.productList = [];
    // Observer
    var response = this.productService.getProductList()
    .subscribe(httpResponse => {

      this.productListResponse = httpResponse;

      if(this.productListResponse.status === 'true'){

        this.productList = this.productListResponse.products !== undefined ? this.productListResponse.products : [];

        console.log(this.products);
      }
      else{
        this.errorMessage = this.productListResponse.message;
      }
    },

    (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

  editProduct(itemObject: ProductList){
    var modalOptions = {
      centered: true,
      size: 'lg',
      scrollable: true,
      ariaLabelledBy: 'modal-basic-title'
    };
    var modalRef = this.modalService.open(ProductModalComponent, modalOptions);

  }

}
