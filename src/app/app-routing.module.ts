import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component:MainLayoutComponent,
    children: [
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'hakkimda',
        component:AboutMeComponent
      },
      {
        path:'iletisim',
        component:ContactComponent
      }
    ]
  },
  {
    path:'admin',
    component:AdminLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
