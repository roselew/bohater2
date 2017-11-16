import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kids',
  template: `
  <p>
  {{parent.email}}
  </p>
  <ul> 
    <li *ngFor="let kid of kids" > 
      <p [routerLink]="['/rodzic/dziecko/'+kid.id]">{{ kid.name }}</p>
      <shortcut-kid [kidId]="kid.id"></shortcut-kid>
    </li> 
  </ul>
  <button routerLink="dodaj-dziecko"> Dodaj kolejne dziecko </button>
  <button routerLink="/">Powrót </button>

  `,
  styles: [],
})
export class KidsComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }
  
  parent = {};
  kids

   ngOnInit(){
     let parentId = parseInt(localStorage.getItem('loggedParent'));
      this.http.get('http://localhost:3000/parents/'+parentId+'?_embed=kids')
        .subscribe( parent => {
          this.parent = parent;
          this.kids = this.parent['kids']
         })
   } 
}
