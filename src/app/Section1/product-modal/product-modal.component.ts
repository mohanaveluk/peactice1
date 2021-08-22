import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from 'src/app/services/bridge.service';
import { ProductList } from 'src/app/services/product/product.model';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  productInfo: ProductList = {};

  txtProductName?: string = "";
  txtProductCategory?: string = "";
  txtProductPrice?: number = 0;


  constructor(
    public modal: NgbActiveModal,
    private bridgeService: BridgeService,

  ) { }

  ngOnInit(): void {
    console.log(`Product info - ${JSON.stringify(this.productInfo)}`);
    this.txtProductName = this.productInfo.productName;
    this.txtProductCategory = this.productInfo.category;
    this.txtProductPrice = this.productInfo.price;
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

}
