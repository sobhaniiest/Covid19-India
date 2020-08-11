import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiaComponent } from './india/india.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';

const routes: Routes = [
  {path : '' , component : IndiaComponent},
  {path : 'State' , component :StateComponent },
  {path : 'District' , component :DistrictComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
