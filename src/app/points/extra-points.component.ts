import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'extra-points',
  template: `
   <label>Za co punkty?</label>
   <input [(ngModel)]="extraPoints.description">
   <label>Points</label>
   <input [(ngModel)]="extraPoints.points">
   <br>
   <button (click)="save()">Save</button>
   <button routerLink='../'>Powrót</button>
  `,
  styles: [],

})
export class ExtraPointsComponent implements OnInit {

  constructor(    
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    ) { }

  kid = {};
  extraPoints={}

  ngOnInit(){
      this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
  }

   save(){
    this.extraPoints['kidId']=parseInt(this.kid['id']);
    let today = new Date().setHours(0,0,0,0);
    this.extraPoints['date']=today;
    this.http.post('http://localhost:3000/extraPoints/', this.extraPoints)
      .subscribe( extraPoints=> {
        this.extraPoints= extraPoints;
        this.router.navigate(['../'],{relativeTo:this.route});
      });
  }
}
