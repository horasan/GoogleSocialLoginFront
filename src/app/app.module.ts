import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './routing/routing-module';
import { FormsModule } from '@angular/forms';
import { Home3Component } from './home3/home3.component';
import { HttpRequestInterceptor } from './http-intercepters/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Home3Component
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
