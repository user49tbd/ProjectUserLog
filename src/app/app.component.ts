import { Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsgComponent } from './components/msg/msg.component';
import { GValsService } from './Services/g-vals.service';
import { MsgOptComponent } from './components/msg-opt/msg-opt.component';
import { ConnectionService } from './Services/connection.service';
@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'project02';
  time!:any;
  usr!:any;
  constructor(private valServ:GValsService,private serv:ConnectionService){
    valServ.ev.subscribe((res)=>{
      //console.log(res)
      //console.log(res['msg'])
      this.checkMsg(res['msg'],res['status'])
    })
    valServ.timerEv.subscribe((value)=>{
      this.time = value['t']
      //console.log(this.time+" the the res is ")
    })
    valServ.trigger.subscribe(()=>{
      this.SessionMsg()
      //console.log(this.time+" the the res is ")
    })
    valServ.usr.subscribe((res)=>{
      this.loadUserFromLocalStorage()
      //console.log(this.time+" the the res is ")
    })
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.loadUserFromLocalStorage()
    window.onload=()=>{
      if(localStorage.getItem('timer')!==null && Number(localStorage.getItem('timer')) > 0){
        this.time = Number(localStorage.getItem('timer'))
      }
      //console.log("load")
    }
  }
  logOut(){
    this.serv.logOut();
  }
  loadUserFromLocalStorage() {
    const userData = localStorage.getItem('user');
    this.usr = userData ? JSON.parse(userData) : null;
  }

  @ViewChild("msgErr",{read:ViewContainerRef,static:true}) msg!:ViewContainerRef
  checkMsg(msgTxt:string,status:string){
    let msgV:ComponentRef<MsgComponent> = this.msg.createComponent(MsgComponent)
    msgV.instance.msg=msgTxt
    msgV.instance.status=status
    setInterval(()=>{
      msgV.destroy()
    },3500)
  }
  SessionMsg(){
    let msgV:ComponentRef<MsgOptComponent> = this.msg.createComponent(MsgOptComponent)
    msgV.instance.close=()=>{
      this.msg.remove(this.msg.indexOf(msgV.hostView))
    }
  }
}
