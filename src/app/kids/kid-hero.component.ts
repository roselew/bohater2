import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'kid-hero',
  template: `

  <div *ngIf="userHero"> 

    <ul>
      <li *ngFor="let badge of userHero.badges1"
        class="bohater" 
        (click)="choseBadge(badge)">
          <p>{{badge.badgeName}}</p> 
          <img *ngIf="badge.gained=='false'" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="badge.gained=='true'" src="{{badge.icon}}">
        </li>
    </ul>

    <ul>
      <li *ngFor="let badge of userHero.badges2"
        class="bohater" 
        (click)="choseBadge(badge)">
          <p>{{badge.badgeName}}</p> 
          <img *ngIf="badge.gained=='false'" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="badge.gained=='true'" src="{{badge.icon}}">
        </li>
    </ul>

     <ul>
      <li *ngFor="let badge of userHero.badges3"
        class="bohater" 
        (click)="choseBadge(badge)">
          <p>{{badge.badgeName}}</p> 
          <img *ngIf="badge.gained=='false'" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="badge.gained=='true'" src="{{badge.icon}}">
        </li>
    </ul>
    

    <div class="odznaki">
      <img src="{{userHero.image}}">
      <img class="green" src="assets/ikony/o_pustaz.svg">
      <p>Pozostały jeszcze {{nBadges}} odznaki do wykorzystania!</p>
    </div>

  </div>

  `,
  styles: [],

})
export class KidHeroComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: MissionsService,
  ) { }

  kid = {}
  userMissions
  userHero
  nUsedBadges
  nBadges 
  nGainedBadges

  ngOnInit() {
    let kidId = +localStorage.getItem('loggedKid');
    this.service.getMissionsHeroes(kidId)
       .subscribe(kid => {
        this.kid = kid;
        this.userHero = this.kid['userHeroes'][0];
        this.nUsedBadges = 
          this.userHero['badges1'].filter( x=> x.gained == 'true' ).length
          +this.userHero['badges2'].filter( x=> x.gained == 'true' ).length
          +this.userHero['badges3'].filter( x=> x.gained == 'true' ).length
        this.userMissions = this.kid['userMissions'];
        this.nGainedBadges = this.service.getAllWeeksProgress(this.userMissions)
          .filter( x => (x.nAll===x.nDone && x.nAll!==0) ).length;
        this.nBadges = this.nGainedBadges - this.nUsedBadges
        })
  }


  choseBadge(badge){
    if (this.nBadges>0 && badge.gained=='false') {
    badge.gained = 'true'
    this.service.updateHero(this.userHero)
    .subscribe( userHero=> {
      this.userHero= userHero;
      this.nBadges -=1;
    }) 
  }
  }


}
