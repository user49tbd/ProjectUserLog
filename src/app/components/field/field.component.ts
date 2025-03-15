import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-field',
  standalone:false,
  templateUrl: './field.component.html',
  styleUrl: './field.component.css',
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>FieldComponent),
      multi:true
    }
  ]
})
export class FieldComponent implements ControlValueAccessor{
  @Input() fieldName!:string
  @Input() fieldID!:string
  @Input() fieldType!:string
  @Input() fieldValid!:any
  @Input() fieldException!:any

  result:string="";
  onChange!: (res:any)=>void;
  onTouched!: ()=>void;
  writeValue(obj: any): void {
    this.result = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
