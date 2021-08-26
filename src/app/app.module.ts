import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule } from 'ngx-logger';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Section1/home/home.component';
import { ProductModalComponent } from './Section1/product-modal/product-modal.component';
import { ProductService } from './services/product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HomeComponent,
    ProductModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    //LoggerModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
