import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IndiaComponent } from './india/india.component';
import { StateComponent } from './state/state.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
// import {MatSort} from '@angular/material/sort'; /** MatSort Not working : Fix it */

@NgModule({
  declarations: [
    AppComponent,
    IndiaComponent,
    StateComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    MatTableModule, 
    MatPaginatorModule
    // MatSort /** MatSort Not working : Fix it */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
