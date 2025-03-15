import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  tok:any=""
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.tok = localStorage.getItem("tokenV");
    //console.log("Intercepting")
    //console.log(this.tok)
    let authReq = req.clone({
        headers:req.headers.set("Authorization",`Bearer ${this.tok}`)
      }
    )
    return next.handle(authReq)
  }
}
