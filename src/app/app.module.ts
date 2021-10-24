import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule } from 'ngx-logger';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Section1/home/home.component';
import { ProductModalComponent } from './Section1/product-modal/product-modal.component';
import { ProductService } from './services/product/product.service';
import { ExampageComponent } from './Section3/exampage/exampage.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    HomeComponent,
    ProductModalComponent,
    ExampageComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    //LoggerModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
