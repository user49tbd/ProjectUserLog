import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-log',
  standalone:false,
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
})
export class LogComponent {
  intro:any =''
  BtnIntro:any =''
  Data:any=''
  SlideOptC:any=''
  Slider:any=''
  SelectorC:any=''
  lab:any=""
  bool:any = false
  bool2:any = false
  constructor(private rend:Renderer2,private el:ElementRef){

  }
  changeSides(){
      this.setVals()
      if(this.bool2){
          this.rend.setStyle(this.Slider,"left","0%")
          //this.Slider.style.left="0%"
          this.rend.setStyle(this.SelectorC,"top","0px")
          //this.SelectorC.style.top="0px"
          this.lab[0].classList.add("select")
          this.lab[1].classList.remove("select")
          //document.querySelectorAll(".log > span > img")[0].classList.add("select")
          //document.querySelectorAll(".sign > span > img")[0].classList.remove("select")
          this.rend.addClass(this.el.nativeElement.querySelectorAll(".log > span > img")[0],"select")
          this.rend.removeClass(this.el.nativeElement.querySelectorAll(".sign > span > img")[0],"select")
      }else{
          this.rend.setStyle(this.Slider,"left","50%")
          //this.Slider.style.left="50%"
          this.rend.setStyle(this.SelectorC,"top","100%")
          //this.SelectorC.style.top="100%"
          this.lab[0].classList.remove("select")
          this.lab[1].classList.add("select")
          //document.querySelectorAll(".log > span > img")[0].classList.remove("select")
          //document.querySelectorAll(".sign > span > img")[0].classList.add("select")

          this.rend.removeClass(this.el.nativeElement.querySelectorAll(".log > span > img")[0],"select")
          this.rend.addClass(this.el.nativeElement.querySelectorAll(".sign > span > img")[0],"select")
          //lab[0].classList.add("select")
          //lab[1].classList.remove("select")
      }
      this.bool2 = !this.bool2
  }
  introChange(){
    this.setVals()
      let h = this.BtnIntro.getBoundingClientRect().height;
      let res = (h+(h/2))
      let h2 = this.SlideOptC.getBoundingClientRect().height
      if(this.bool == false){
          this.rend.setStyle(this.Data,"height",`${res}px`)
          //this.Data.style.height = `${res}px`;
          this.rend.setStyle(this.BtnIntro,"height",`${h}px`)
          //this.BtnIntro.style.height=`${h}px`;
          this.BtnIntro.children[1].innerHTML="&UpArrow;"
          this.rend.setStyle(this.SlideOptC,"height",`0px`)
          //this.SlideOptC.style.height=`0px`
      }else{
          this.rend.setStyle(this.Data,"height",`100%`)
          //this.Data.style.height = `100%`

          this.BtnIntro.children[1].innerHTML="&DownArrow;"
          this.rend.setStyle(this.SlideOptC,"height",`75%`)
          //this.SlideOptC.style.height=`75%`

      }
      this.hideForms()
      this.bool = !this.bool
  }
  setVals(){
      this.intro = this.el.nativeElement.getElementsByClassName("Intro")[0]
      this.BtnIntro = this.el.nativeElement.getElementsByClassName("BtnIntro")[0]
      this.Data = this.el.nativeElement.getElementsByClassName("Data")[0]
      this.SlideOptC = this.el.nativeElement.getElementsByClassName("SlideOptC")[0]
      this.Slider = this.el.nativeElement.getElementsByClassName("Slider")[0]
      this.SelectorC = this.el.nativeElement.getElementsByClassName("SelectorC")[0]
      this.lab = this.el.nativeElement.getElementsByClassName("txtOpt")
  }
  hideForms(){
    let rf = this.el.nativeElement.getElementsByClassName("LeftC")[0]
    let lf = this.el.nativeElement.getElementsByClassName("RightC")[0]
    if(this.bool == false){
        this.rend.setStyle(rf,"opacity","0")
        this.rend.setStyle(lf,"opacity","0")
    }else{
        this.rend.setStyle(rf,"opacity","1")
        this.rend.setStyle(lf,"opacity","1")
    }
  }
}
