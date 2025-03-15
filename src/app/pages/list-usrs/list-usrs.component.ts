import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { GValsService } from '../../Services/g-vals.service';
import { usrData } from '../../models/usrData';

@Component({
  selector: 'app-list-usrs',
  standalone: false,
  templateUrl: './list-usrs.component.html',
  styleUrl: './list-usrs.component.css'
})
export class ListUsrsComponent implements OnInit{
  listUsrs!: any[]
  constructor(private serv: ConnectionService, private gval: GValsService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.serv.getUsrList().subscribe((res) => {
      //console.log(res)
      this.listUsrs = res
    })
  }
  changeP(item: usrData) {
    this.serv.changePriv(item).subscribe({
      next: (val) => {
        this.gval.setMsg(val, "ok")
        this.getUsers()
      },
      error: (err) => {
        this.gval.setMsg("erro ao alterar privilegio", "err")
      }
    })
  }
}
