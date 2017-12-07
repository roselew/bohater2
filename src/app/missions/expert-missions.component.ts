import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'expert-missions',
  template: `

   <ul class="mission-neutral"> 
    <span class="showMore bounce" (click)="showMore($event)">▼</span>
    <li *ngFor="let mission of missions"
    class="circle-mid"
    [routerLink]="['../dodaj-polecana/' + mission.id]"
    > 
      <p>{{ mission.name }} </p>
      <img src="{{mission.icon}}">
    </li> 
  </ul> 

  `,
  styles: [],
})
export class ExpertMissionsComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private http: HttpClient
  ) { }

  missions

   ngOnInit(){
        this.http.get(this.API_URL+ 'expertMissions')
        .subscribe( missions => this.missions = missions )
   }

   showMore(przycisk){
    let panel=document.getElementsByClassName('mission-neutral')[0]
    ;
    if (!panel['style'].height || panel['style'].height !=='auto'){
     panel['style'].height = 'auto';
     przycisk.target.innerHTML='&#x25B2';
    } else {
     panel['style'].height = '24rem';
     przycisk.target.innerHTML='&#x25BC';
    }  
 }
}
