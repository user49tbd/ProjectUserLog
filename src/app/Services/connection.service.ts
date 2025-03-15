import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { User } from '../models/usr';
import { usrData } from '../models/usrData';
import { Session } from '../models/session';
import { GValsService } from './g-vals.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpC:HttpClient,private servg:GValsService,private rot:Router) { }

  log(obj:User){
    localStorage.setItem("tokenV","")
    return this.httpC.post<Session>('http://localhost:4200/login',obj).pipe(
      take(1),
      tap({
        next:(value)=>{
          localStorage.setItem("tokenV",value.token)
          localStorage.setItem("timer",value.timer)
          localStorage.setItem("user",JSON.stringify(obj))
          this.servg.setUsr()
          this.servg.setTimerEv(parseInt(value.timer))
          console.log(value);
        },
        error:(err)=>{console.log(err);}
      })
    )
  }
  renovation(obj:User){
    localStorage.setItem("tokenV","")
    this.httpC.post<Session>('http://localhost:4200/login',obj).pipe(
      take(1),
      tap({
        next:(value)=>{
          console.log(value);
        },
        error:(err)=>{console.log(err);}
      })
    ).subscribe({
      next:(val)=>{
        localStorage.setItem("tokenV",val.token)
        localStorage.setItem("timer",val.timer)
        localStorage.setItem("user",JSON.stringify(obj))
        this.servg.setUsr()
        this.servg.setTimerEv(parseInt(val.timer))
        console.log(val)
        this.servg.setMsg("Renovação concluida","ok")
      },
      error:(err)=>{console.log(err)
        this.servg.setMsg("Erro ao realizar a renovação","err")
        this.logOut()
      }
    })
  }
  register(obj:User){
    return this.httpC.post("/api/register",obj,{responseType:"text"}).pipe(
      take(1),
      tap({
        next:(val)=>{console.log(val)},
        error:(err)=>{console.log(err)}
      })
    )
  }
  getUsrList(){
    return this.httpC.get<usrData[]>("/api/getAll").pipe(
      take(1),
      tap({
        next:(val)=>{console.log(val)},
        error:(err)=>{console.log(err)}
      })
    )
  }
  changePriv(obj:usrData){
    return this.httpC.post("/api/changePriv",obj,{responseType:"text"}).pipe(
      take(1),
      tap({
        next:(val)=>{console.log(val)},
        error:(err)=>{console.log(err)}
      })
    )
  }
  logOut(){
    localStorage.setItem("tokenV","")
    localStorage.setItem("timer","")
    localStorage.setItem("user","")
    this.servg.setTimerEv(0)
    this.servg.setUsr()
    this.rot.navigate(["/"])
  }
  getRote(){
    return this.httpC.get("/api/get2",{responseType:"text"}).pipe(
      take(1),
      tap({
        next:(val)=>{console.log(val)},
        error:(err)=>{console.log(err)}
      })
    )
  }
  findUserName(name:string){
    console.log("find by name "+name)
    return this.httpC.get(`/api/getusrName/${name}`,{responseType:"text"}).pipe(
      take(1),
      tap({
        next:(val)=>{console.log(val)},
        error:(err)=>{console.log(err)}
      })
    )
  }
}
