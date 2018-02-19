import { Component, OnInit, Input} from '@angular/core';
import { GiftsService } from "../services/gifts.service";
import { MissionsService } from '../services/missions.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'shortcut-kid',
  template: `

  <a [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/postepy/0']" *ngIf="kid">
    <div class="kid-label">{{kid.name}}
    </div>	
  </a>

<div *ngIf="userMissions && userGifts">

<div class="total-progress" [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/postepy/0']">
<progress-week [userMissions]="userMissions"></progress-week> 
</div>

  <div class="kid-icon">
    <a [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/postepy/0']" [queryParams]="{filter: 'wait'}">
    <missions-to-accept [userMissions]="userMissions"></missions-to-accept> 
    </a>	
  </div>		

  <div class="kid-icon">		
    <a [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/nagrody']">
    <gifts-to-receive [userGifts]="userGifts"></gifts-to-receive> 
    </a>
  </div>

  <div class="kid-icon">
  <a [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/misje/dodaj']">
    <img src="../../assets/list2.svg" class="enlarge">
    <p>Dodaj nową misję</p>
  </a>
</div>

<div class="kid-icon">
  <a [routerLink]="['/rodzina/rodzic/dziecko/'+kidId+'/punkty/punkty-ekstra']">
    <img src="../../assets/addstars.svg" class="enlarge">
    <p>Dodaj punkty ekstra</p>
  </a>
</div>




  
</div>

<app-spinner *ngIf="!userMissions || !userGifts"></app-spinner>

  `,
  styles: [],

})
export class ShortcutKidComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private giftsService: GiftsService,
    private missionsService: MissionsService,
  ) { }

  @Input()
  kidId 

  kid
  userMissions
  userGifts

  ready = 0

  ngOnInit(){

    this.usersService.getOneKid(this.kidId)
    .subscribe ( kid => {this.kid = kid} )

    this.giftsService.fetchGifts(this.kidId)
      .subscribe ( userGifts => this.userGifts = userGifts)

    this.missionsService.fetchMissions(this.kidId)
    .subscribe ( userMissions => this.userMissions = userMissions )
    
  }    


}
