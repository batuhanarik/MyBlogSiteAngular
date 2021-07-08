import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "../app-routing.module"
import {ComponentsModule} from "../components/components.module";

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NavComponent,
    HomeComponent,
    AboutMeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class MainModule { }
