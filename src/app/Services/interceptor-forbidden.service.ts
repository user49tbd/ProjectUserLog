import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { GValsService } from './g-vals.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorForbiddenService implements HttpInterceptor {
  constructor(private router: Router,private serv:GValsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.router.navigate(['/']);
          this.serv.setMsg("acesso nao autorizado ","err")
        }
        return throwError(() => error);
      })
    );
  }
}
