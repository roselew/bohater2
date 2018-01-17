import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'family-panel',
  template: `

  <app-header [simpleH1]="'Rodzina'" [skewH1]="'Bohaterów'"></app-header> 

  <p *ngIf="parent" class="logout" (click)="logout()">Witaj {{parent.email}}! <br> Wyloguj </p>

  <div class="title-container">

    <div *ngIf="parent" class="kid-card" (click)="goToParent()">
        <p>{{parent.gender}}</p>
        <img src="assets/logoXL.png" class="parent-image">
    </div>

    <div *ngFor="let kid of kids; let i = index" class="kid-card" (click)="goToKid(kid)">
      <img src="{{experts.getHeroImage(kid.heroId)}}">
      <p>{{kid.name}}</p>
      <div class="allStars">
        <div *ngFor="let badge of kid.badges">
          <star-svg *ngIf="badge==true"></star-svg>
        </div>
      </div>
    </div>

    <p *ngIf="kids && kids.length == 0" class="smallTitle"> Wejdź w swój profil aby dodać dziecko </p>
    
    <a [routerLink]="['/rodzina/edytuj']">
    <div class="plus"><img src="assets/settings.svg" width="40%"></div>
    </a>

  </div>

  `,
  styleUrls: ['../../sass/parent-panel.scss'],
})
export class FamilyPanelComponent implements OnInit {

  constructor(
    public experts: ExpertsService,
    public afAuth: AngularFireAuth,
    public users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
    this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

    ngOnDestroy() {
      this.renderer.removeClass(document.body,'kid')
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
     if (kid.codeExist=='T'){
      this.users.toLogUser = kid.id
      this.router.navigate(['rodzina/dziecko-logowanie'])
     } else {
       this.users.currentKid = kid.id
       this.router.navigate(['rodzina/dziecko/'+kid.id])
     }
   }

   goToParent(){
     if (this.parent.codeExist=='T'){
       this.users.toLogUser = this.parent.email
       this.router.navigate(['rodzina/rodzic-logowanie'])
     } else {
       this.users.currentParent = this.parent.email
       this.router.navigate(['rodzina/rodzic'])
     }

     }
   
}
