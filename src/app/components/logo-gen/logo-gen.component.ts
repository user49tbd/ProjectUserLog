import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-logo-gen',
  standalone:false,
  templateUrl: './logo-gen.component.html',
  styleUrl: './logo-gen.component.css'
})
export class LogoGenComponent implements AfterViewInit{
  @Input() bkImg!:string;
  @Input() maskImg!:string;
  constructor(private rend:Renderer2,private elmt:ElementRef){

  }
  ngAfterViewInit(): void {
    this.rend.setStyle(this.elmt.nativeElement.getElementsByClassName("mask")[0],"mask-image",
    `url('${this.maskImg}')`)
  }
}
