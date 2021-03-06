import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';
import { MissionsService } from '../services/missions.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'gifts',
  template: `

  <p *ngIf="userGifts && userGifts.length==0" class="smallTitle"> 
    Dziecko nie ma jeszcze żadnych nagród. Dodaj kilka przyciskiem <span>+</span> w prawym dolnym rogu strony
  </p>

   <div *ngIf="(chosenGifts && chosenGifts.length>0)" class="chosenGiftsPanel">
     <div class="panelTitle">
         <p> Dziecko wybrało nagrodę</p>
    </div>
  
    <ul class="mission-neutral"
      *ngFor="let userGift of chosenGifts">
      <li class="circle-big"> 
        <p> {{userGift.name}} </p>
        <img src="{{userGift.icon}}">
        <star-svg></star-svg>
        <span>{{userGift.points}}</span>
     </li> 
     <div class='buttonPanel'>
      <button (click)="receive(userGift)">Kup nagrodę</button>
      <button (click)="receive(userGift)" class="altButton">Potwierdź odbiór</button>
    </div>

    </ul>

 </div>

<p class="smallTitle">W sumie dziecko zdobyło {{allPoints}} pkt. <br> Do wykorzystania pozostały {{totalPoints}} pkt.</p>

  <ul class="mission-neutral mission-done">
  <li 
    *ngFor="let userGift of availableGifts" 
    [routerLink]="['dostepne/'+userGift.id]"
    class="circle-big"> 
      <p>
        {{userGift.name}}
      </p>
      <img src="{{userGift.icon}}">
      <star-svg></star-svg>
      <span>{{userGift.points}}</span>
  </li> 
</ul>
<ul class="mission-neutral highlight">
<li 
  *ngFor="let userGift of unusedGifts" 
  [routerLink]="[userGift.id]"
  class="circle-big"> 
    <p>
      {{userGift.name}}
    </p>
    <img src="{{userGift.icon}}">
    <star-svg></star-svg>
    <span>{{userGift.points}}</span>
</li> 
</ul>


<p *ngIf="(receivedGifts && receivedGifts.length>0)" class="smallTitle">Nagrody już zdobyte</p>

<ul class="mission-neutral mission-unactive">
<li 
  *ngFor="let userGift of receivedGifts" 
  class="circle-big"> 
    <p>
      {{userGift.name}}
    </p>
    <img src="{{userGift.icon}}">
    <star-svg></star-svg>
    <span>{{userGift.points}}</span>
</li> 
</ul>


<div class="plus" routerLink="dodaj">+</div>
  
  `,
  styles: [`
  .mission-neutral li.circle-big{
    margin: 2rem 4% 4rem 4%;
  }
  .chosenGiftsPanel{
    width: 100%;
    background-color:#f5f5f5;
    margin: 2rem 0; 
  }
  .chosenGiftsPanel li.circle-big{
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  .buttonPanel {
    vertical-align: top;
  }
  .buttonPanel button {
    margin-bottom: 10px;
  }

  .panelTitle {
    background-size: 4rem;
  }
 }

  `],
})
export class GiftsComponent implements OnInit {

  constructor(    
    private giftsService: GiftsService,
    private missionsService: MissionsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  kid = {};
  userMissions
  userGifts
  allPoints = 0
  totalPoints = 0
  unusedGifts
  availableGifts
  chosenGifts
  receivedGifts
  extraPoints
  kidId

  ngOnInit(){
    this.kidId = this.route.parent.snapshot.paramMap.get('kidId');
    this.fetchGifts()
  }

 fetchGifts(){
    this.giftsService.fetchGifts(this.kidId)
    .subscribe( userGifts => {
      this.userGifts = userGifts
      this.chosenGifts = this.userGifts.filter (x => x.status==='chosen');
      this.receivedGifts = this.userGifts.filter (x => x.status==='received'); 

      this.missionsService.fetchMissions(this.kidId)
        .subscribe( userMissions => {
          this.userMissions = userMissions

        })
      this.giftsService.fetchExtraPoints(this.kidId)
        .subscribe (extraPoints => {
          this.extraPoints = extraPoints

          this.calculatePoints();
          this.unusedGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points > this.totalPoints);  
          this.availableGifts = this.userGifts.filter( x => x.status==='unused').filter( x => x.points <= this.totalPoints);
        
        })
    }) 
 }

  calculatePoints(){
    this.totalPoints = 0
    this.allPoints = 0
    for (let mission of this.userMissions){
      this.allPoints += mission['doneDates'].length * parseInt(mission['points'])
      this.totalPoints += mission['doneDates'].length * parseInt(mission['points'])
    }
    for (let gifts of this.chosenGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let gifts of this.receivedGifts){
      this.totalPoints -= parseInt(gifts['points'])
    }
    for (let points of this.extraPoints){
      this.allPoints += parseInt(points['points'])
      this.totalPoints += parseInt(points['points'])
    }
  }


  receive(gift){
      gift['status']='received';
      this.giftsService.updateOneGift(gift, gift['id'])
        .subscribe( ()=> this.fetchGifts() );
  };
  

}
