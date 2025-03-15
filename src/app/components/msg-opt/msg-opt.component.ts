import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectionService } from '../../Services/connection.service';
import { User } from '../../models/usr';

@Component({
  selector: 'app-msg-opt',
  standalone:false,
  templateUrl: './msg-opt.component.html',
  styleUrl: './msg-opt.component.css'
})
export class MsgOptComponent {
  @Output() ev:EventEmitter<any> = new EventEmitter();

  constructor(private serv:ConnectionService){

  }

  restoreS(){
    console.log("restore")
    let obj:User = JSON.parse(localStorage.getItem("user") || '{}');
    console.log(obj.name+" - "+obj.password)
    this.serv.renovation(obj)
    this.close()
  }
  logout(){
    console.log("logout")
    this.serv.logOut()
    this.close()
  }
  close(){
    this.ev.emit()
  }
}
