import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kid-menu',
  template: `
  <div class="title-container">
  <ul>
    <a routerLink="../bohater"><li class="menu-bohater"><p>BOHATER</p></li></a>
    <a routerLink='../misje/0'><li class="menu-misje"><p>MISJE</p></li></a>
    <a routerLink="../odznaki/0"><li class="menu-odznaki"><p>ODZNAKI</p></li></a>
    <a routerLink="../nagrody"><li class="menu-nagrody"><p>NAGRODY</p></li></a>		
  </ul>  
  </div>

  `,
  styleUrls: ['../../sass/kid-menu.scss']

})
export class KidMenuComponent implements OnInit {

    // <p *ngIf="kid;else unloggedInfo">Witaj {{kid.id}}</p>
  //   <ng-template #unloggedInfo><p>Nie jesteś zalogowany</p></ng-template>

  constructor(
    private router:   Router,
    private http:     HttpClient,
    private route:    ActivatedRoute,   
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

  kid

  ngOnInit() {
    let kidId = localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/'+kidId)
    .subscribe( kid => this.kid = kid )

  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'title-page');
  }

}
