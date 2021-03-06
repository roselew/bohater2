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
      <img src="{{userHero.image}}" height="150px">
      <img *ngIf="nBadges>0" class="green" src="assets/ikony/o_pustaz.svg">
      <img *ngIf="nBadges==0" class="green" src="assets/ikony/o_pusta.svg">
      <hero-progress *ngIf="heroProgress && !alertVisible" [heroProgress]="heroProgress"></hero-progress>
      <p *ngIf="nBadges==0">Musisz wykonać wszystkie misje w tygodniu aby zdobyć odznakę</p>
      <p *ngIf="nBadges>0">Pozostały jeszcze {{nBadges}} odznaki do wykorzystania!</p>
    </div>

    <ul class="lista-odznak">
      <li *ngFor="let badge of userHero['badges']; let i = index"
        class="bohater" 
        (click)="select(badge,i)">
          <p>{{badge.badgeName}}</p> 
          <p *ngIf="kid['badges'][i]==false" class="badge-gain">{{showBadgeGain(badge)}}</p>
          <p *ngIf="kid['badges'][i]==true" class="badge-gain badge-gain-true">{{showBadgeGain(badge)}}</p>
          <img *ngIf="kid['badges'][i]==false" src="assets/ikony/o_pusta.svg" class="pusta">
          <img *ngIf="kid['badges'][i]==true" src="{{badge.icon}}">
        </li>
    </ul>

  </div>

  <!-- pop up window for changing mission status -->
  <div *ngIf="selectedBadge" class="alert">
    <span class="X" (click)="selectedBadge=null"> X </span>

    <ul class="mission-neutral">
      <li style="width: 80%; background: none; border:none" class="circle-big">
        <p> {{selectedBadge.badgeName}} </p>
        <p style="bottom: -10rem"> {{showBadgeGain(selectedBadge)}}</p>
        <img style="height: 100%; width: 8rem" src="{{selectedBadge.icon}}">
      </li>
    </ul>

    <button (click)="choseBadge()">Wybieram tę odznakę</button>
    <button (click)="selectedBadge=null">Jeszcze się zastanowię</button>

  </div>

    <!-- pop up window for changing mission status -->
    <div *ngIf="editBadge" class="alert">
    <span class="X" (click)="editBadge=null"> X </span>

    <ul class="mission-neutral">
      <li style="width: 80%; background: none; border:none" class="circle-big">
        <p> {{editBadge.badgeName}} </p>
        <p style="bottom: -10rem"> {{showBadgeGain(editBadge)}}</p>
        <img style="height: 100%; width: 8rem" src="{{editBadge.icon}}">
      </li>
    </ul>

    <button (click)="deleteBadge()">Chcę inną odznakę</button>
    <button (click)="editBadge=null">Wróć do listy moich odznak</button>

  </div>


  <a [routerLink]="['../']">
    <div class="back">←</div>
  </a>

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
  kidId
  userMissions
  userHero
  nBadges 
  heroProgress
  selectedBadge
  editBadge
  selectedIndex

  ngOnInit() {

    this.kidId = this.users.getLoggedUser('kid');

    this.service.fetchMissions(this.kidId)
      .subscribe(userMissions => {
      this.userMissions = userMissions;
      let nGainedBadges = this.service.getAllWeeksProgress(this.userMissions)
      .filter( x => (x.nAll===x.nDone && x.nAll!==0) ).length;
      
      this.users.getOneKid(this.kidId)
        .subscribe(kid => {
          this.kid= kid
          this.userHero = this.experts.getOneExpertHero(this.kid.heroId)
          let nUsedBadges = this.kid.badges.filter( x => x == true).length
          this.nBadges = nGainedBadges - nUsedBadges;
          this.heroProgress = this.experts.getHeroPowers(this.kid.heroId, this.kid.badges)
      }) 
    
    })

  }

  select(userBadge,i){
    if (this.kid.badges[i]==true){
      this.editBadge=userBadge;
      this.selectedIndex=i;
    } else if ( this.nBadges<=0 ) {
      this.showAlert(this.userHero.image,'Niestety','Musiszy wykonać więcej misji żeby zdobyć tą nagrodę')
    } else { 
      this.selectedBadge=userBadge;
      this.selectedIndex=i;
    }
  }

  choseBadge(){

      this.showAlert(this.userHero.image,'Gratulacje','Właśnie zdobyłeś kolejną odznakę')
      this.kid.badges[this.selectedIndex]=true
      this.users.updateOneKid(this.kid,this.kidId)
      .then ( () => {
        this.selectedBadge=null; 
        this.heroProgress = this.experts.getHeroPowers(this.kid.heroId, this.kid.badges) 
      });
       
  }

  deleteBadge(){

    this.showAlert(this.userHero.image,'OK','Wybierz inną odznakę')
    this.kid.badges[this.selectedIndex]=false
    this.users.updateOneKid(this.kid,this.kidId)
    .then ( () => {
      this.editBadge=null; 
      this.heroProgress = this.experts.getHeroPowers(this.kid.heroId, this.kid.badges) 
    });
     
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
