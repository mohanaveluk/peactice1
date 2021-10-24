import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModelResponse, LoginResponse } from 'src/app/services/user/auth.model';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginResponse: LoginResponse;
  loginModelResponse: LoginModelResponse;

  isLoginError: boolean = false;
  loginErrorMessage: string = '';
  loginSuccessMessage: string = '';

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  validateUser(){
    let username = this.loginForm.value.userName;
    let password = this.loginForm.value.userPassword;
    let authRespose = this.authService.userAuthentication(username, password)
    .subscribe(response => {
      this.loginResponse = response;
      if(this.loginResponse.status === 'true'){
        this.loginSuccessMessage = "Logged in successfully";
        this.isLoginError = false;
        //sessionStorage.setItem("loginInfo", JSON.stringify(this.loginResponse.result));
        sessionStorage.setItem("appToken", JSON.stringify(this.loginResponse.result?.token));
        this.router.navigateByUrl('/product');
      }
      else{
        this.loginErrorMessage = this.loginResponse.message !== undefined ? this.loginResponse.message : '';
        this.isLoginError = true;
      }
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
      this.loginErrorMessage = err.toString();
    });
  }

  verifyUser(){
    this.validateUser();
  }

  initialiseForm(){
      this.loginForm = this.formBuilder.group({
        userName: [''],
        userPassword: [''],
      });
    }



}
