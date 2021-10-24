import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginApi = 'http://localhost:3000/api/v1/user/login';

  constructor(    private httpClient: HttpClient,
    ) { }

  userAuthentication(emailInput: any, passwordInput: any): Observable<any>{
    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
      'No-Auth': 'True',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });

    let options = {
      headers: httpHeaders
    };
    let postData = { 'useremail': emailInput, 'userpassword': passwordInput };
    return this.httpClient.post<LoginResponse>(this.loginApi, postData, options);
  }

}
