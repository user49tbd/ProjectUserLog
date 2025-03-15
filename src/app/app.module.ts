import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouteMModule } from './route-m.module';
import { MainComponent } from './pages/main/main.component';
import { LogComponent } from './pages/log/log.component';
import { Form1Component } from './components/form1/form1.component';
import { StepLstComponent } from './components/step-lst/step-lst.component';
import { FieldComponent } from './components/field/field.component';
import { BtnCComponent } from './components/btn-c/btn-c.component';
import { LogoGenComponent } from './components/logo-gen/logo-gen.component';
import { FormSignComponent } from './components/form-sign/form-sign.component';
import { InterceptorService } from './Services/interceptor.service';
import { MsgComponent } from './components/msg/msg.component';
import { IconPPipe } from './Services/icon-p.pipe';
import { TimerComponent } from './components/timer/timer.component';
import { MsgOptComponent } from './components/msg-opt/msg-opt.component';
import { ListUsrsComponent } from './pages/list-usrs/list-usrs.component';
import { InterceptorForbiddenService } from './Services/interceptor-forbidden.service';

@NgModule({
  declarations: [AppComponent,MainComponent,
    LogComponent,Form1Component,
    StepLstComponent,FieldComponent,
    BtnCComponent,LogoGenComponent,
    FormSignComponent,MsgComponent,IconPPipe,
    TimerComponent,MsgOptComponent,
    ListUsrsComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,RouteMModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => InterceptorService),
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass:forwardRef(()=>InterceptorForbiddenService),
      multi: true
    }
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
