import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SessionService } from "./session.service";

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    // Tutaj bedziemy przechowywac dane sesji uzytkownika, m.in. token
    SessionService,
    // Wykonaj SessionService.intercept() przed kazdym zapytaniem, by dodac token
    { provide: HTTP_INTERCEPTORS, useExisting: SessionService, multi:true}
  ],
  declarations: []
})
export class SessionModule { }
