import { Component } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { usrData } from '../../models/usrData';
import { GValsService } from '../../Services/g-vals.service';

@Component({
  selector: 'app-main',
  standalone:false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  valueRes!:string
  listUsrs!:any[]
  constructor(private serv:ConnectionService,private gval:GValsService){

  }

  getdata(){
    this.serv.getRote().subscribe((res)=>{
      this.valueRes = res
    })
  }
  getUsers(){
    this.serv.getUsrList().subscribe((res)=>{
      console.log(res)
      this.listUsrs = res
    })
  }
  changeP(item:usrData){
    this.serv.changePriv(item).subscribe({
      next:(val)=>{
        this.gval.setMsg(val,"ok")
        this.getUsers()
      },
      error:(err)=>{
        this.gval.setMsg("erro ao alterar privilegio","err")
      }
    })
  }
}
