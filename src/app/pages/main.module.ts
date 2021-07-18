import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from "../app-routing.module"
import {ComponentsModule} from "../components/components.module";
import { MaterialModule } from '../modules/material/material.module';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MainLayoutComponent } from '../components/layouts/main-layout/main-layout.component';
import { NavComponent } from '../components/nav/nav.component';
import { ArticleComponent } from './article/article.component';
import { CategoryArticlesComponent } from './category-articles/category-articles.component';
import { SearchComponent } from './search/search.component';
import { ArchiveComponent } from './archive/archive.component';




@NgModule({
  declarations: [
    MainLayoutComponent,
    NavComponent,
    HomeComponent,
    AboutMeComponent,
    ContactComponent,
    ArticleComponent,
    CategoryArticlesComponent,
    SearchComponent,
    ArchiveComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class MainModule { }
