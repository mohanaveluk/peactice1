import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === "True") {
      return next.handle(req.clone());
    }
    var token = sessionStorage.getItem("appToken");
    if (token !== null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.replace(/"/g, "")}`)
      });
      return next.handle(clonedReq).pipe(
        tap(data => {
          console.log(data);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            console.log('req url :: ' + req.url);
            if (err.status === 401) {
              this.router.navigate(['/login']);
            }
          }
          return throwError(err);
        })
      );
    }
    else {
      this.router.navigateByUrl('/login');
    }
    return next.handle(req);
  }
}
