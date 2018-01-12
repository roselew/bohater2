import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'parent-panel',
  template: `

  <app-header *ngIf="parent" [simpleH1]="parent.family"></app-header> 

  <p *ngIf="parent" class="logout" (click)="logout()">Witaj {{parent.email}}! <br> Wyloguj </p>

  <div class="title-container">

    <div *ngIf="parent" class="parent-card" [routerLink]="['/rodzic']">
        <p>{{parent.name}}</p>
    </div>

    <div *ngFor="let kid of kids; let i = index" class="kid-card" (click)="goToKid(kid)">
      <img *ngIf="i%2==0" class="leftImage" src="{{experts.getHeroImage(kid.heroId)}}">
      <img *ngIf="i%2==1"class="rightImage" src="{{experts.getHeroImage(kid.heroId)}}">
      <div *ngIf="i%2==0" class="leftStars">
        <div class="stars" *ngFor="let badge of kid.badges">
          <star-svg *ngIf="badge==true"></star-svg>
        </div>
      </div>
      <div *ngIf="i%2==1" class="rightStars">
        <div class="stars" *ngFor="let badge of kid.badges">
          <star-svg *ngIf="badge==true"></star-svg>
        </div>
      </div>
      <p>{{kid.name}}</p>

    </div>

    <p *ngIf="kids && kids.length == 0" class="smallTitle"> Dodaj dziecko przyciskiem <span>+</span> w prawym dolnym rogu strony</p>
    
    <a [routerLink]="['/rodzic/dzieci/dodaj-dziecko']">
      <div class="plus">+</div>
    </a>

  </div>

  `,
  styleUrls: ['../../sass/parent-panel.scss'],
})
export class ParentPanelComponent implements OnInit {

  constructor(
    public experts: ExpertsService,
    public afAuth: AngularFireAuth,
    public users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }
  
    showSpinner: boolean = true

    logout() {
      this.afAuth.auth.signOut()
      .then( () => this.router.navigate(['/witaj']))
    }

  kids
  parent 
   ngOnInit(){

    

     this.users.getOneParent(this.users.currentUserEmail)
        .subscribe( parent => {
          this.parent = parent;

        })

     this.users.getParentKids()
        .subscribe( kids => {
          this.kids = kids;
          this.showSpinner = false
         })
   } 

   goToKid(kid){
    this.users.currentKid = kid.login
    this.router.navigate(['/dziecko'])
   }
}
