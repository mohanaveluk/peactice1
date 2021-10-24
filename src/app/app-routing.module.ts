import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './Section2/customer/customer.component';
import { ProductComponent } from './Section1/product/product.component';
import { HomeComponent } from './Section1/home/home.component';
import { ExampageComponent } from './Section3/exampage/exampage.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [

  {path: 'product', component: ProductComponent, data: {title: 'Product master'}},
  {path: 'customer', component: CustomerComponent, data: {title: 'Customer master'}},
  {path: 'exam', component: ExampageComponent, data: {title: 'Exam master'}},
  {path: 'login', component: LoginComponent, data: {title: 'User login'}},
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
