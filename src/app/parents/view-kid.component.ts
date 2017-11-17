import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-kid',
  template: `
   <label>Imię</label>
   <input [(ngModel)]="kid.name">
   <br>
   <label>Rok urodzenia</label>
   <input [(ngModel)]="kid.birth">
   <br>
   <label>Login</label>
   <input [(ngModel)]="kid.login"> 
   <br>
   <label>Hasło</label>
   <input [(ngModel)]="kid.password">
   <br>
   
  `,
  styles: [],

})
export class ViewKidComponent implements OnInit {

@Input()
kid 

  constructor() { }

  ngOnInit() {
  }

}
