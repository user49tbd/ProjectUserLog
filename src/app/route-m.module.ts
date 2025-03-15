import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LogComponent } from './pages/log/log.component';
import { ListUsrsComponent } from './pages/list-usrs/list-usrs.component';

let rot:Routes= [
  {path:"",component:MainComponent},
  {path:"log",component:LogComponent},
  {path:"list",component:ListUsrsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(rot)
  ],
  exports:[RouterModule]
})
export class RouteMModule { }
