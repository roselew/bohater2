import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kid-hero',
  template: `
  <p> Bohater <p>

  <div *ngIf="userHero"> 
    {{ userHero.name }}

    <ul>
      <li *ngFor="let badge of userHero.badges1"
        (click)="choseBadge(badge)">
        {{badge.badgeName}} - {{badge.gained}}
        
        </li>
      </ul>
      <ul>
      <li *ngFor="let badge of userHero.badges2"
        (click)="choseBadge(badge)">
        {{badge.badgeName}} - {{badge.gained}}
        </li>
      </ul>
      <ul>
      <li *ngFor="let badge of userHero.badges3"
        (click)="choseBadge(badge)">
        {{badge.badgeName}} - {{badge.gained}}
        </li>
      </ul>

  </div>

  <button routerLink='/dziecko'>Powrót do menu </button>
  `,
  styles: [],

})
export class KidHeroComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  choseBadge(badge){
    badge.gained = 'true'
    this.http.put('http://localhost:3000/userHeroes/'+ this.userHero['id'], this.userHero)
    .subscribe( userHero=> {
      this.userHero= userHero;
    }) 
  }

  checkNumberOfBadges(){
    let today = new Date();
    today.setHours(0,0,0,0);
  

    let firstMissionStart =new Date(this.userMissions.sort(function(a,b){
      return a['start']-b['start'];
    })[0].start)
    //calculate how many week before today's week we need to go back
    let firstWeekId = ((firstMissionStart.getDate() - firstMissionStart.getUTCDay()) -(today.getDate() - today.getUTCDay()))/ 7;

 
    for (let weekId=firstWeekId; weekId<1; weekId++){
        console.log(weekId)
      for (let dayId=weekId*7-today.getUTCDay(); dayId<weekId*7+7-today.getUTCDay(); dayId++){
        console.log(dayId)
      }

    }



  }

  kid = {}
  userMissions
  userHero
  nBadges

  ngOnInit() {
    this.kid['id'] = +localStorage.getItem('loggedKid');
    this.http.get('http://localhost:3000/kids/' + this.kid['id'] + '?_embed=userHeroes&_embed=userMissions')
      .subscribe(kid => {
        this.kid = kid;
        this.userHero = this.kid['userHeroes'][0];
        this.userMissions = this.kid['userMissions'];
        this.checkNumberOfBadges();
      })
  }

}
