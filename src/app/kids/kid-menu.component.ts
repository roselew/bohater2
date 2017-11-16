import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kid-menu',
  template: `
    <p *ngIf="kid;else unloggedInfo">Witaj {{kid.id}}</p>
    <ng-template #unloggedInfo><p>Nie jesteś zalogowany</p></ng-template>
    <button routerLink='../misje'>MISJE</button>
    <button routerLink="../nagrody">NAGRODY></button>
    <button routerLink="../bohater">BOHATER</button>
    <button routerLink="../odznaki">ODZNAKI</button>
    <button routerLink="/"> Powrót </button>
  `,
  styles: [],

})
export class KidMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private http:   HttpClient,
    private route:  ActivatedRoute,   
  ) { }

  kid

  ngOnInit() {
    let kidId = localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/'+kidId)
    .subscribe( kid => this.kid = kid )

  }

}
