import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Section2/customer/customer.component';
import { ProductComponent } from './Section1/product/product.component';
import { HomeComponent } from './Section1/home/home.component';

const routes: Routes = [

  {path: 'product', component: ProductComponent, data: {title: 'Product master'}},
  {path: 'customer', component: CustomerComponent, data: {title: 'Customer master'}},
  {path: '', component: HomeComponent, data: {title: 'Hopme page'}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export const RoutingComponents = [
  ProductComponent,
  CustomerComponent
];
