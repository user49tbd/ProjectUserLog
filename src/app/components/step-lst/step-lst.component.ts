import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-step-lst',
  standalone:false,
  templateUrl: './step-lst.component.html',
  styleUrl: './step-lst.component.css'
})
export class StepLstComponent implements OnInit {
  @Input("qtd") qtd:any=0;
  @Input("errPos") errPos:any=0;
  getC!:any;
  subscription!:Subscription
  constructor(private el:ElementRef,private rend:Renderer2){

  }
  ngOnInit(): void {
    this.getC = this.el.nativeElement.getElementsByClassName("ContainerLst")[0]
    this.addEl(this.getC,this.qtd)
    this.subscription = this.errPos.subscribe((value: any) => {
      this.addMarker(value[0],value[1])
    });
  }
  addEl(elmt:any,qtd:any){
    for(let i=0;i<qtd;i++){
      let elm = this.rend.createElement("div")
      this.rend.addClass(elm,"Item")
      let item = this.rend.createElement("div")
      let img = this.rend.createElement("img")
      this.rend.appendChild(item,img)
      this.rend.appendChild(elm,item)

      this.rend.appendChild(elmt,elm)
    } 
  }
  addMarker(vl:any,bol:any){
    Array.from(this.getC.children).forEach((res:any,index)=>{

      if(index <= vl-1){
        if(index == vl-1 && bol == false){
          this.rend.removeClass(res.children[0],"bkcol")
          this.rend.addClass(res.children[0],"bkcolR")
          res.children[0].textContent="X"
        }else{
          this.rend.removeClass(res.children[0],"bkcolR")
          this.rend.addClass(res.children[0],"bkcol")
          res.children[0].textContent="V"
        }
      }else{
        res.children[0].textContent=""
        this.rend.removeClass(res.children[0],"bkcol")
        this.rend.removeClass(res.children[0],"bkcolR")
      }
      res.children[0].style.setProperty("--max",this.qtd)
      res.children[0].style.setProperty("--pos",index)
      res.style.setProperty("--max",this.qtd)
      res.style.setProperty("--pos",index)
    })
  }
}
