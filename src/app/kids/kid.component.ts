import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'kid',
  template: `

      <my-header [kid]="kid"></my-header>
 
      <button routerLink="missions">Misje</button>
      <br>
      <button routerLink="gifts">Nagrody</button>
      <br>
      <button routerLink="one-week/0">Postępy tydodniowe</button>
      <br>
      <button routerLink="one-day/0">Postępy dzienne</button>
      <br>
      <p>Przejź na stronę dziecka </p>
      <button routerLink="edit-kid">Ustawienia profilu dziecka</button>
      <br>
      <button [routerLink]="['/parents/'+parentId]">Przełącz dziecko</button>
      <br>

  `,
  styles: ['button{margin:10px;padding:5px;}'],
})
export class KidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,   
  ) { }

  parentId
  kid = {};

   ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => {
          this.kid = kid;
          this.parentId = this.kid['parentId']; 
        })
   }

}
