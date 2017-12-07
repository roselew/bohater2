import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shortcut-kid',
  template: `

  <a [routerLink]="['/rodzic/dziecko/'+kidId]" *ngIf="kid">
    <div class="kid-label" [routerLink]="['/rodzic/dziecko/'+kidId]">{{kid.name}}
    </div>	
  </a>

<div *ngIf="userMissions && userGifts">

  <div class="kid-icon">
    <a [routerLink]="['/rodzic/dziecko/'+kidId+'/postepy/0']" [queryParams]="{filter: 'wait'}">
    <img src="../../assets/mission.svg" class="enlarge">
    <missions-to-accept [userMissions]="userMissions"></missions-to-accept> 
    </a>	
  </div>		

  <div class="kid-icon">		
    <a [routerLink]="['/rodzic/dziecko/'+kidId+'/nagrody']">
    <img src="../../assets/gift.svg" class="enlarge">
    <gifts-to-receive [userGifts]="userGifts"></gifts-to-receive> 
    </a>
  </div>

  <div class="total-progress" [routerLink]="['/rodzic/dziecko/'+kidId+'/postepy/0']">
      <progress-week [userMissions]="userMissions"></progress-week> 
  </div>

  <div class="kid-icon">
    <a [routerLink]="['/rodzic/dziecko/'+kidId+'/misje/dodaj']">
      <img src="../../assets/list2.svg" class="enlarge">
      <p>Dodaj nową misję</p>
    </a>
  </div>

  <div class="kid-icon">
    <a [routerLink]="['/rodzic/dziecko/'+kidId+'/punkty/punkty-ekstra']">
      <img src="../../assets/addstars.svg" class="enlarge">
      <p>Dodaj punkty ekstra</p>
    </a>
  </div>
  
</div>

  `,
  styles: [],

})
export class ShortcutKidComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private http: HttpClient
  ) { }

  @Input()
  kidId 
  
  kid
  userMissions
  userGifts

  ngOnInit() {
    this.http.get(this.API_URL+ 'kids/'+this.kidId+'?_embed=userMissions&_embed=userGifts')
      .subscribe( kid => {
        this.kid=kid;
        this.userMissions = kid['userMissions'];
        this.userGifts = kid['userGifts'];
       })
  }
}
