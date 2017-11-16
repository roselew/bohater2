import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'shortcut-kid',
  template: `
    <p> Na skróty: </p>
    <ul *ngIf="userMissions && userGifts">
      <li 
        [routerLink]="['/rodzic/dziecko/'+kidId+'/postepy/0']"> 
        <missions-to-accept [userMissions]="userMissions"></missions-to-accept> 
      </li>
      <li 
        [routerLink]="['/rodzic/dziecko/'+kidId+'/nagrody']"> 
        <gifts-to-receive [userGifts]="userGifts"></gifts-to-receive> 
      </li>
      <li 
        [routerLink]="['/rodzic/dziecko/'+kidId+'/postepy/0']"> 
        <progress-week [userMissions]="userMissions"></progress-week> 
      </li>
      <br>
      <li 
        [routerLink]="['/rodzic/dziecko/'+kidId+'/misje/dodaj']"> 
        Dodaj nową misję 
      </li>
      <br>
      <li 
        [routerLink]="['/rodzic/dziecko/'+kidId+'/punkty/punkty-ekstra']"> 
        Dodaj punkty ekstra
      </li>
    </ul>
  `,
  styles: [],

})
export class ShortcutKidComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  @Input()
  kidId 
  
  userMissions
  userGifts

  ngOnInit() {
    this.http.get('http://localhost:3000/kids/'+this.kidId+'?_embed=userMissions&_embed=userGifts')
      .subscribe( kid => {
        this.userMissions = kid['userMissions'];
        this.userGifts = kid['userGifts'];
       })
  }
}
