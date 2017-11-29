import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MissionsService } from '../missions/missions.service';

@Component({
  selector: 'kid-hero',
  template: `

  <div class="container">

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

  </div>
  `,
  styles: [],

})
export class KidHeroComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
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
    this.kid['id'] = +localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/' + this.kid['id'] + '?_embed=userHeroes&_embed=userMissions')
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
    this.http.put('http://localhost:3000/userHeroes/'+ this.userHero['id'], this.userHero)
    .subscribe( userHero=> {
      this.userHero= userHero;
      this.nBadges -=1;
    }) 
  }
  }


}
