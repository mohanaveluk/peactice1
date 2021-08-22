import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BridgeService } from 'src/app/services/bridge.service';
import { ProductList, ProductListResponse } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import Swal from 'sweetalert2';


@Component({
selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  sub: Subscription = new Subscription();
  product$: ProductList[] = [];
  products: any = [];
  productList: ProductList[] = [];

  productListResponse: ProductListResponse = {};
  errorMessage: any = "";

    // Error messages
    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();

   // Products adjusted as per the criteria

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private bridgeService: BridgeService
    ) { }

  ngOnInit(): void {
    //this.displayProducts();
    this.getProductList();
    this.watchEvent();
  }


  displayProducts(){
    this.products = this.productService.getProducts();
    //this.sub = this.productService.product$.subscribe(list => this.products = list);
    //this.product$ = this.productService.product$.subscribe(list => this.products = list);
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
    modalRef.componentInstance.productInfo = itemObject; // product information

  }

  updatedProduct: ProductList = {};
  watchEvent(){
    this.bridgeService.receiveData().subscribe(response => {
      this.updatedProduct = response;
      console.log(this.updatedProduct);

      if(response.type !== 'product') {return;}

      //update the collection
      //this.productList

      var selectedItem = this.productList.find(item => item.productId === this.updatedProduct.productId);

      if(selectedItem!== undefined){
        selectedItem.category = this.updatedProduct.category;
        selectedItem.productName = this.updatedProduct.productName;
        selectedItem.price = this.updatedProduct.price;
      }
    });
  }


  async removeProduct(item: ProductList){

    var confirm = await Swal.fire({
      title: 'Are you sure to delete product?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '$success',
      cancelButtonColor: '$danger',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      return new Promise((resolve, reject) => {
        if (result.value) {
          resolve('true');
        } else {
          resolve('false');
        }
      });
    });

    if(confirm === 'false'){return;}

    var selectedIndex = this.productList.findIndex(item => item.productId === item.productId);
    this.productList.splice(selectedIndex, 1);


    Swal.fire({
      icon: 'success', title: "Status",
      text: `Product ${item.productName} has been removed`,
      showCancelButton: false, confirmButtonText: 'Ok'
    });

  }


}
