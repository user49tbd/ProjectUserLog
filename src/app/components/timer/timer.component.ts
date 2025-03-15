import { Component, ElementRef, Input, Renderer2,OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { GValsService } from '../../Services/g-vals.service';

@Component({
  selector: 'app-timer',
  standalone:false,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {
  @Input() milis!:any
  con = document.getElementsByClassName("ClockDiv")[0]
  min:any
  sec:any
  clk1:any
  clk2:any
  constructor(private rend:Renderer2,private el:ElementRef,private serv:GValsService){
    this.min=0
    this.sec=0
  }
  ngOnInit(): void {
    console.log("this is the milis "+this.milis)
    let mil = Number(this.milis)
    console.log(mil+" this is de timer milis "+(mil+1000))
    this.tfMS(mil)
    this.genClock(this.el.nativeElement.querySelectorAll(".LClock > .elmtn")[0], this.min)
    this.genClock(this.el.nativeElement.querySelectorAll(".RClock > .elmtn")[0], this.sec)
    this.clk1 = this.el.nativeElement.getElementsByClassName("Clock")[0]
    this.clk2 = this.el.nativeElement.getElementsByClassName("Clock")[1]
    this.decTimer(this.clk1, this.clk2)
  }
genClock(context:any, val:any) {
  let docClock =this.rend.createElement("div") 
  this.rend.addClass(docClock,"Clock")
  for (let i = 0; i < 60; i++) {
    let doc = this.rend.createElement("div")
    this.rend.addClass(doc,"Line")
    doc.style.setProperty("--pos", i)
    let dot = this.rend.createElement("div")
    this.rend.addClass(dot,"dot")
    dot.style.setProperty("--w", "15%")
    if (((i + 1) % 5) == 0) {
      dot.style.setProperty("--w", "30%")
    }
    this.rend.appendChild(doc,dot)
    this.rend.appendChild(docClock,doc)
  }
  let txt = this.rend.createElement("p")
  this.rend.addClass(txt,"numberC")
  this.rend.setProperty(txt,"textContent",val)
  this.fillClock(docClock, val)

  this.rend.appendChild(context,docClock)
  this.rend.appendChild(context,txt)
}
fillClock(clockElmt:any, val:any) {
  console.log("the value is " + val)
  for (let i = 0; i < 60; i++) {
    let clock = clockElmt.children[i]
    if (i < val) {
      this.rend.setStyle(clock.children[0],"backgroundColor","white")
    } else {
      this.rend.setStyle(clock.children[0],"backgroundColor","gray")
    }
  }
}
tfMS(ms:any) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  this.min = minutes
  this.sec = seconds
  return `${minutes} minutos e ${seconds} segundos`;
}
setDot(elmt:any, pos:any) {
  let clock = elmt.children[pos]
  this.rend.setStyle(clock.children[0],"backgroundColor","gray")
}
decTimer(minE:any, secE:any) {
  let inter = setInterval(() => {
    if (this.sec == 0 && this.min > 0) {
      this.sec = 60
      this.min -= 1
      this.setDot(minE, this.min)
      this.fillClock(secE, 60)
      this.el.nativeElement.getElementsByClassName("numberC")[0].textContent = this.min
      this.el.nativeElement.getElementsByClassName("numberC")[1].textContent = this.sec
      this.decSotrageTimer()
    } else if (this.sec > 0) {
      this.decSotrageTimer()
      this.setDot(secE, this.sec - 1);
      this.sec -= 1;
      this.el.nativeElement.getElementsByClassName("numberC")[1].textContent = this.sec
    } else {
      clearInterval(inter)
      let usr = JSON.parse(localStorage.getItem("user") || "{}")
      if(this.milis !=null && usr.name != null){
        this.serv.showOpt();
      }
      this.serv.setTimerEv(null)
      return;
    }
  }, 1000)
}
decSotrageTimer(){
  let qtd = Number(localStorage.getItem('timer'))
  localStorage.setItem("timer",(qtd-1000).toString());
}
}
