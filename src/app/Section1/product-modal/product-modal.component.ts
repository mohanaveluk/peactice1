import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from 'src/app/services/bridge.service';
import { CategoryList, CategoryListResponse, ProductList, ProductUpdateResponse } from 'src/app/services/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  productInfo: ProductList;

  productUpdateResponse: ProductUpdateResponse;

  categoryListResponse: CategoryListResponse;
  categoryList: CategoryList[];

  txtProductName?: string = "";
  txtProductCategory?: string = "";
  txtProductPrice?: number = 0;

  productForm: FormGroup ;

  updateMode = "Add";

  constructor(
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private productService: ProductService,
    private bridgeService: BridgeService,

  ) {

  }

  //https://medium.com/ngx/3-ways-to-implement-conditional-validation-of-reactive-forms-c59ed6fc3325
  ngOnInit(): void {
    console.log(`Product info - ${JSON.stringify(this.productInfo)}`);
    //this.txtProductName = this.productInfo.productName;
    //this.txtProductCategory = this.productInfo.category;
    //this.txtProductPrice = this.productInfo.price;

    this.initialiseForm();
    this.loadCategory();
    this.updateMode = this.productInfo?.productId === null || this.productInfo?.productId === undefined ? "Add Product" : "Update";

  }

  saveProduct(){
    this.productInfo.productName = this.txtProductName;
    this.productInfo.category = this.txtProductCategory;
    this.productInfo.price = this.txtProductPrice;
    console.log(`Product info updated - ${JSON.stringify(this.productInfo)}`);

    var sendObject = {type: 'product', value: this.productInfo};
    this.bridgeService.publishData(sendObject);
    this.modal.dismiss();

    Swal.fire({
      icon: 'warning', title: "Status",
      text: 'Product info has been udpated!',
      showCancelButton: false, confirmButtonText: 'Ok'
    });
  }

  loadCategory(){

    this.categoryList = [];

    var categoryResponse = this.productService.getCategory(0).subscribe(response => {
      this.categoryListResponse = response;
      if(this.categoryListResponse.status === 'true'){
        this.categoryList = this.categoryListResponse.result !== undefined ? this.categoryListResponse.result: [];
      }

    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }




  updateProductByForm(){
    console.log("Valid status: ", this.productForm.valid);

    console.log(this.productForm.value);
    var formValue = this.productForm.value;

    if(this.productInfo.productId === null || this.productInfo.productId === undefined) {this.productInfo.productId = 0;}
    this.productInfo.prodcutDescription = '';
    this.productInfo.productName = this.productForm.value.productName;
    this.productInfo.category = formValue.productCategory;
    this.productInfo.price = formValue.productPrice;


    var updateResponse = this.productService.updateProduct(this.productInfo).subscribe(response => {
      this.productUpdateResponse = response;

      if(this.productUpdateResponse.status === 'true'){
        if(this.productUpdateResponse.result === 'success'){
          var sendObject = {type: 'product', value: this.productInfo};
          this.bridgeService.publishData(sendObject);
          this.modal.dismiss();

          Swal.fire({
            icon: 'warning', title: "Status",
            text: 'Product info has been udpated!',
            showCancelButton: false, confirmButtonText: 'Ok'
          });
        }
      }
      else{
        Swal.fire({
          icon: 'error', title: "Status",
          text: this.productUpdateResponse.message,
          showCancelButton: false, confirmButtonText: 'Ok'
        });
      }

    },
    (err: HttpErrorResponse) => {

    });


  }


  initialiseForm(){
    if (this.productInfo !== undefined) {
      this.productForm = this.formBuilder.group({
        productId: [this.productInfo.productId],
        productName: [this.productInfo.productName, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        productCategory: [this.productInfo.category === undefined ? '' : this.productInfo.category, [Validators.required]],
        productPrice: [this.productInfo.price]
      });
    }
    else {
      this.productForm = this.formBuilder.group({
        productId: [''],
        productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        productCategory: ['', [Validators.required]],
        productPrice: [0]
      });
    }
  }

}
