import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ConnectionService } from '../../Services/connection.service';
import { User } from '../../models/usr';
import { GValsService } from '../../Services/g-vals.service';

@Component({
  selector: 'app-form-sign',
  standalone:false,
  templateUrl: './form-sign.component.html',
  styleUrl: './form-sign.component.css'
})
export class FormSignComponent {
form01!:FormGroup
  errPos = new BehaviorSubject<any[]>([]);

  getErr() {
    return this.errPos.asObservable();
  }
  constructor(private fb:FormBuilder,private serv:ConnectionService,
    private gVal:GValsService
  ){
    this.form01 = fb.group({
      name:[null,[Validators.required,this.checkLen()],[this.checkUserName()]],
      password:[null,[Validators.required,this.checkLen()]],
    },{validators:this.getTot()})
  }
  getClas(field:any){
    return{
      "validCK":this.form01.get(field)?.valid && this.form01.get(field)?.touched,
      "invalidCK":!this.form01.get(field)?.valid && this.form01.get(field)?.touched
    }
  }
  checkUserName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      console.log(control.value)
  
      return this.serv.findUserName(control.value).pipe(
        map((res: any) => {
          console.log("Resposta recebida:", res);
          return res ? { error: "nome já cadastrado" } : null;
        }),
        catchError((err) => {
          console.error("Erro na requisição:", err);
          return of(null);
        })
      );
    };
  }
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
    console.log(this.form01.value)

    Object.keys(this.form01.controls).map((res)=>{
      this.form01.get(res)?.markAsTouched()
    })
    if(this.form01.valid){
      let obj:User = {name:this.form01.get("name")?.value,
              password:this.form01.get("password")?.value}
      this.serv.register(obj).subscribe({
        next:(vl)=>{
          console.log("ok user saved")
          this.gVal.setMsg("cadastro realizado com sucesso","ok")
        },
        error:(err)=>{
          console.log(err)
          this.gVal.setMsg("erro ao realizar cadastro","err")
        }
      })
    }
  }
  reset(){
    this.form01.reset()
  }
}
