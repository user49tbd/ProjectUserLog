import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-c',
  standalone:false,
  templateUrl: './btn-c.component.html',
  styleUrl: './btn-c.component.css'
})
export class BtnCComponent {
  @Input() name!:any
  @Input() ck!:any
}
