import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionsService } from '../missions/missions.service';
import { UsersService } from '../session/users.service';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'kid-hero',
  template: `

  <div *ngIf="kid"> 

    <div class="odznaki">
      <img src="{{userHero.image}}">
      <img *ngIf="nBadges>0" class="green" src="assets/ikony/o_pustaz.svg">
      <img *ngIf="nBadges==0" class="green" src="assets/ikony/o_pusta.svg">
      <p class="smallTitle">Pozostały jeszcze {{nBadges}} odznaki do wykorzystania!</p>
    </div>

    <ul>
      <li *ngFor="let badge of userHero['badges']; let i = index"
        class="bohater" 
        (click)="choseBadge(i)">
          <p>{{badge.badgeName}}</p> 
          <img *ngIf="kid['badges'][i]==false" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="kid['badges'][i]==true" src="{{badge.icon}}">
        </li>
    </ul>

  </div>

  `,
  styles: [],

})
export class KidHeroComponent implements OnInit {

  constructor(
    private experts: ExpertsService,
    private users: UsersService,  
    private router: Router,
    private route: ActivatedRoute,
    private service: MissionsService,
  ) { }

  kid 
  userMissions
  userHero
  nBadges 

  ngOnInit() {

    let kidId = this.users.getLoggedUser('kid');

    this.service.fetchMissions(kidId)
      .subscribe(userMissions => {
      this.userMissions = userMissions;
      let nGainedBadges = this.service.getAllWeeksProgress(this.userMissions)
      .filter( x => (x.nAll===x.nDone && x.nAll!==0) ).length;
      
      this.users.getOneKid(kidId)
        .subscribe(kid => {
          this.kid= kid
          this.userHero = this.experts.getOneExpertHero(this.kid.heroId)
          let nUsedBadges = this.kid.badges.filter( x => x == true).length
          this.nBadges = nGainedBadges - nUsedBadges;
      }) 
    
    })

  }


  choseBadge(i){
    if (this.nBadges>0 && this.kid.badges[i]==false) {
    this.kid.badges[i]=true
    this.users.updateOneKid(this.kid)
    .subscribe( kid=> {
      this.kid = kid;
      this.nBadges -=1;
    }) 
  }
  }


}
