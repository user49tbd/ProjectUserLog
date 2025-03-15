import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconP',
  standalone:false
})
export class IconPPipe implements PipeTransform {
  res=""
  transform(value: any, ...args: unknown[]):any {
    switch(value){
      case 'user': this.res="/assets/icon/user_17740838.png"
      break;
      case 'admin': this.res="/assets/icon/configuration.png"
      break;
    }
    return this.res;
  }

}
