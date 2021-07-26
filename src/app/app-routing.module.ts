import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndiaComponent } from './india/india.component';
import { StatesComponent } from './states/states.component';

const routes: Routes = [
  {path : '' , component : IndiaComponent},
  {path : 'states' , component :StatesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
