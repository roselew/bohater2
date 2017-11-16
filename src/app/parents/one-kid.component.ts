import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'one-kid',
  template: `
    <my-header [kid]="kid"></my-header>

    <button routerLink="misje">Misje</button>

    <button routerLink="nagrody">Nagrody</button>

    <button routerLink="postepy/0">Postępy tydodniowe</button>

    <button routerLink="punkty">Punkty</button>

    <button (click)="goToKid()">Przejź na stronę dziecka </button>

    <button routerLink="edytuj-dziecko">Ustawienia profilu dziecka</button>

    <button routerLink='/rodzic'>Powrót do listy dzieci</button>
    
    <br>

    <router-outlet></router-outlet>
  `,

})
export class OneKidComponent implements OnInit {

  constructor(
    private router: Router,
    private http:   HttpClient,
    private route:  ActivatedRoute,   
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

   goToKid(){
    localStorage.clear()
    localStorage.setItem('loggedKid',this.kid['id'])
    this.router.navigate(['/dziecko'])
   }

}
