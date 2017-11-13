import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'parent',
  template: `
    <p>
      {{parent.email}}
    </p>
    <ul> 
      <li *ngFor="let kid of kids" > 
        <p [routerLink]="['/kids/'+kid.id]">{{ kid.name }}</p>
        <shortcut-kid [kidId]="kid.id"></shortcut-kid>
      </li> 
    </ul>
    <button routerLink="create-kid"> Dodaj kolejne dziecko </button>
    <button routerLink="/parents">Powrót do listy rodziców </button>
  `,
  styles: [],
})
export class ParentComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  parent = {};
  kids

   ngOnInit(){
      this.parent['id']=this.route.snapshot.paramMap.get('parentId');
      this.http.get('http://localhost:3000/parents/'+this.parent['id'])
        .subscribe( parent => this.parent = parent )
      this.http.get('http://localhost:3000/parents/'+this.parent['id']+'/kids')
        .subscribe( kids => this.kids = kids )
   }

}
