import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Home3Component } from '../home3/home3.component';

const appRoutes: Routes = [
    //{path: 'menu', component: MenuComponent},
    { path: '', component: Home3Component, pathMatch: 'full' }
  ];

@NgModule({
    declarations: [],
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  
  }