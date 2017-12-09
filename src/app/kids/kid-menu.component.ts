import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KidsService } from "./kids.service";
import { UsersService } from "../session/users.service";
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'kid-menu',
  template: `
 
  <ul>
    <a routerLink="../bohater"><li class="menu-bohater" [ngStyle]="{'background': heroImage}"><p>BOHATER</p></li></a>
    <a routerLink='../misje/0'><li class="menu-misje"><p>MISJE</p></li></a>
    <a routerLink="../odznaki/0"><li class="menu-odznaki"><p>ODZNAKI</p></li></a>
    <a routerLink="../nagrody"><li class="menu-nagrody"><p>NAGRODY</p></li></a>		
  </ul>  


  `,
  styleUrls: ['../../sass/kid-menu.scss']

})
export class KidMenuComponent implements OnInit {

    // <p *ngIf="kid;else unloggedInfo">Witaj {{kid.id}}</p>
  //   <ng-template #unloggedInfo><p>Nie jesteś zalogowany</p></ng-template>

  constructor(
    private users: UsersService,
    private experts: ExpertsService,
    private service: KidsService,
    private router: Router,
    private route:  ActivatedRoute,   
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

  kid
  heroImage
  ngOnInit() {
    let kidId = this.users.getLoggedUser('kid');
    this.service.getOneKid(kidId)
    .subscribe( kid => {
      this.kid = kid
      this.heroImage = '#FDB524 url(../' + this.experts.getHeroImage(this.kid['heroId'])+') top 30% center no-repeat' 
     })
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'title-page');
  }

}
