import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/usr';
import { ConnectionService } from '../../Services/connection.service';
import { Router } from '@angular/router';
import { GValsService } from '../../Services/g-vals.service';

@Component({
  selector: 'app-form1',
  standalone:false,
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.css'
})
export class Form1Component {
  form01!:FormGroup
  errPos = new BehaviorSubject<any[]>([]);

  getErr() {
    return this.errPos.asObservable();
  }
  constructor(private fb:FormBuilder,private serv:ConnectionService,
    private rot:Router,private servG:GValsService
  ){
    this.form01 = fb.group({
      name:[null,[Validators.required,this.checkLen()]],
      password:[null,[Validators.required,this.checkLen()]],
    },{validators:this.getTot()})
  }
  getClas(field:any){
    return{
      "validCK":this.form01.get(field)?.valid && this.form01.get(field)?.touched,
      "invalidCK":!this.form01.get(field)?.valid && this.form01.get(field)?.touched
    }
  }
  //validation
  checkLen():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      let field = control.value
      if(!field){
        return {error:"Não pode ser nulo"}
      }
      if(field.length <= 5){
        return {error:"Deve ter mais de 5 caracteres"}
      }
      return null
    }
  }
  getTot():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      let inc =0
      let tot =0
      let bool = false
      if(control instanceof FormGroup){
        let obj = Object.keys(control.controls)
        obj.forEach((res:any)=>{
          tot+=1
          if(!control.get(res)?.valid){
            inc+=1
            if(inc == 1){
              bool = true
              this.errPos.next([tot,false]);
            }
          }
        })
      }
      if(bool == false){
        this.errPos.next([tot,true]);
      }
      if(inc>0){
        return {error:`${inc}|${tot}`}
      }
      return null
    }
  }
  subs(){

    Object.keys(this.form01.controls).map((res)=>{
      this.form01.get(res)?.markAsTouched()
    })
    if(this.form01.valid){
      let obj:User = {name:this.form01.get("name")?.value,
        password:this.form01.get("password")?.value}
      console.log(obj)

      this.serv.log(obj).subscribe({
        next:(value)=>{
          this.servG.setMsg("login realizado com sucesso","ok")
          this.rot.navigate(["/"])
        },
        error:(err)=>{
          this.servG.setMsg("falha ao realizar login","err")
        }
      
    })
    }
  }
  reset(){
    this.form01.reset()
  }
}
