import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'extra-points',
  template: `


<img src="assets/logoXL.png" width="300px" height="300px">

<form class="">

	<input type="text" name="newMissionName" placeholder="Za co punkty?" [(ngModel)]="extraPoints.description">
	<span class="less">-</span>
  <input type="number" name="newMissionPoints" placeholder="Liczba punktów ekstra" [(ngModel)]="extraPoints.points">
  <span class="more">+</span>
	<button (click)="save()">DODAJ PUNKTY</button>

</form>

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
