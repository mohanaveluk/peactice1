import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from 'src/app/services/bridge.service';
import { ProductList, ProductUpdateResponse } from 'src/app/services/product/product.model';
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

  txtProductName?: string = "";
  txtProductCategory?: string = "";
  txtProductPrice?: number = 0;

  productForm: FormGroup ;

  constructor(
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private productService: ProductService,
    private bridgeService: BridgeService,

  ) { }

  ngOnInit(): void {
    console.log(`Product info - ${JSON.stringify(this.productInfo)}`);
    //this.txtProductName = this.productInfo.productName;
    //this.txtProductCategory = this.productInfo.category;
    //this.txtProductPrice = this.productInfo.price;

    this.initialiseForm();

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

  updateProductByForm(){
    console.log("Valid status: ", this.productForm.valid);

    console.log(this.productForm.value);
    var formValue = this.productForm.value;


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
        productCategory: [this.productInfo.category, [Validators.required]],
        productPrice: [this.productInfo.price]
      });
    }
    else {
      this.productForm = this.formBuilder.group({
        productId: [''],
        productName: [''],
        productCategory: [''],
        productPrice: [0]
      });
    }
  }

}
