import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'mission',
  template: `

  <view-mission [mission]="mission" [days]="days"></view-mission>
  <br>

  <button (click)="update()">Zapisz zmiany</button>
  <button (click)="finish()">Zakończ</button>
  <button (click)="remove()">Usuń</button>
  <button routerLink='../'>Powrót</button>
  `,
  styles: [],

})
export class MissionComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,  
  ) { }

  mission = {};
  days=[
    {name: 'PN', value: 0, checked: false},
    {name: 'WT', value: 1, checked: false},
    {name: 'ŚR', value: 2, checked: false},
    {name: 'CZ', value: 3, checked: false},
    {name: 'PT', value: 4, checked: false},
    {name: 'SB', value: 5, checked: false},
    {name: 'ND', value: 6, checked: false}
  ];

  get selectedDays() { 
    return this.days
              .filter(opt => opt.checked)
              .map(opt => opt.value)
    }

  ngOnInit(){
    this.mission['id']=this.route.snapshot.paramMap.get('missionId');
    this.http.get('http://localhost:3000/userMissions/'+this.mission['id'])
      .subscribe( mission => {
        this.mission = mission;
        for (let day of this.mission['days']) {
          this.days.map(opt => {if (opt.value===day){opt.checked=true}})
        }
        } )
 }

   update(){
    this.mission['days']=this.selectedDays;
      this.http.put('http://localhost:3000/userMissions/'+ this.mission['id'], this.mission)
      .subscribe( mission=> {
        this.mission= mission; 
        this.router.navigate(['../'],{relativeTo:this.route});
      })
   }

   remove(){
       this.http.delete('http://localhost:3000/userMissions/'+ this.mission['id'])
       .subscribe( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
   }

   finish(){
     let today = new Date().setHours(0,0,0,0);
     this.mission['finish']=today;

     this.http.put('http://localhost:3000/userMissions/'+ this.mission['id'], this.mission)
     .subscribe( mission=> {
       this.mission= mission; 
       this.router.navigate(['../'],{relativeTo:this.route});
     })

   }
   
}
