import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionsService } from '../services/missions.service';
import { UsersService } from '../services/users.service';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'kid-hero',
  template: `

  <div *ngIf="kid"> 

    <div class="odznaki">
      <img src="{{userHero.image}}">
      <img *ngIf="nBadges>0" class="green" src="assets/ikony/o_pustaz.svg">
      <img *ngIf="nBadges==0" class="green" src="assets/ikony/o_pusta.svg">
      <hero-progress *ngIf="heroProgress && !alertVisible" [heroProgress]="heroProgress"></hero-progress>
      <p>Pozostały jeszcze {{nBadges}} odznaki do wykorzystania!</p>
    </div>

    <ul class="lista-odznak">
      <li *ngFor="let badge of userHero['badges']; let i = index"
        class="bohater" 
        (click)="choseBadge(i)">
          <p>{{badge.badgeName}}</p> 
          <p style="bottom: -15rem">{{showBadgeGain(badge)}}</p>
          <img *ngIf="kid['badges'][i]==false" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="kid['badges'][i]==true" src="{{badge.icon}}">
        </li>
    </ul>

  </div>

  <app-alert *ngIf="alertVisible" 
  (change)="alertVisible=false" 
  [imageSrc]="alertImage" 
  [textTitle]="alertTitle" 
  [textPlain]="alertText">
</app-alert>

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
  heroProgress
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
          this.heroProgress = this.experts.getHeroPowers(this.kid.heroId, this.kid.badges)
      }) 
    
    })

  }


  choseBadge(i){
    if (this.kid.badges[i]==true){
      this.showAlert(this.userHero.image,this.userHero.badges[i].badgeName,'Ta odznaka jest już Twoja !')
    } else if ( this.nBadges<=0 ) {
      this.showAlert(this.userHero.image,'Niestety','Musiszy wykonać więcej misji żeby zdobyć tą nagrodę')
    } else { 
      this.showAlert(this.userHero.image,'Gratulacje','Właśnie zdobyłeś kolejną odznakę')
      this.kid.badges[i]=true
      this.users.updateOneKid(this.kid)
      .subscribe( kid=> {
        this.kid = kid;
        this.heroProgress = this.experts.getHeroPowers(this.kid.heroId, this.kid.badges);
      }) 
    }
  }

  showBadgeGain(badge){
    if (badge.gained[0]>0){
      return ['+' + badge.gained[0] + ' szybkość']
    } else if (badge.gained[1]>0){
      return ['+' + badge.gained[1] + ' siła']
    } else {
      return ['+' + badge.gained[2] + ' zwinność']
    }
  }

    //obsługa alertów
    alertVisible = false
    alertImage
    alertText
    alertTitle
    
    showAlert(imageSrc,textTitle,textPlain){
      this.alertVisible = true
      this.alertImage = imageSrc
      this.alertText = textPlain
      this.alertTitle = textTitle
    }
    
    hideAlert(){
      this.alertVisible = false
      this.alertImage=""
      this.alertText=""
      this.alertTitle=""
    }


}
