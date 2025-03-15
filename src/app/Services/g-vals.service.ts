import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GValsService {

  msg!:string
  t!:any
  ev = new EventEmitter();
  usr = new EventEmitter();
  timerEv = new EventEmitter();
  trigger = new EventEmitter();
  constructor() { }
  setMsg(newMsg:string,status:string){
    this.msg = newMsg
    //console.log("error atualizado")
    //console.log(this.msg)
    this.ev.emit({"msg":this.msg,"status":status})
  }
  setUsr(){
    this.usr.emit()
  }

  getMsg(){
    return this.msg
  }
  setTimerEv(vl:any){
    this.t = vl;
    //console.log("timer is "+vl)
    this.timerEv.emit({"t":this.t})
  }
  showOpt(){
    this.trigger.emit({"show":true})
  }



}
