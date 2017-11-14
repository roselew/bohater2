import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'parents',
  template: `
    <ul> <li *ngFor="let parent of parents" [routerLink]="[parent.id]"> {{ parent.email }} </li> </ul> 
    
    <button routerLink="/kids"> Widok dziecka </button>
  `,
  styles: [],
})
export class ParentsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  parents

   ngOnInit(){
        this.http.get('http://localhost:3000/parents')
        .subscribe( parents => this.parents = parents )
   }

}
