import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg',
  standalone:false,
  templateUrl: './msg.component.html',
  styleUrl: './msg.component.css'
})
export class MsgComponent {
  @Input() msg!:string
  @Input() status!:string
}
