import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { ExpertsService } from '../services/experts.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'kid-menu',
  template: `

  <p class="logout" *ngIf="kid" (click)="logout()">Witaj {{kid.name}}! <br> Wyloguj </p>

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
    public afAuth: AngularFireAuth,
    private users: UsersService,
    private experts: ExpertsService,
    private router: Router,
    private route:  ActivatedRoute,   
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

    logout() {
      this.users.currentKid = ""
      this.afAuth.auth.signOut()
      .then( () => this.router.navigate(['/witaj']))
    }

  kid
  heroImage
  ngOnInit() {
    let kidId = this.users.getLoggedUser('kid');
    this.users.getOneKid(kidId)
    .subscribe( kid => {
      this.kid = kid
      this.heroImage = '#FDB524 url(../' + this.experts.getHeroImage(this.kid['heroId'])+') top 30% center no-repeat' 
     })
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'title-page');
  }

}
