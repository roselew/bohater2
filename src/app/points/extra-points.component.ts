import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'extra-points',
  template: `


<img src="assets/logoXL.png" width="200px" height="200px">

<form class="">

	<input type="text" name="newMissionName" placeholder="Za co punkty?" [(ngModel)]="extraPoints['description']">
	<span class="less" (click)="lessPoints()">-</span><input type="number" name="newMissionPoints" placeholder="Liczba punktów ekstra" [(ngModel)]="+extraPoints['points']"><span class="more" (click)="morePoints()">+</span>
	<button (click)="save()">DODAJ PUNKTY</button>

</form>

  `,
  styles: [],

})
export class ExtraPointsComponent implements OnInit {

  constructor(    
    @Inject('API_URL') private API_URL,
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
    this.http.post(this.API_URL+ 'extraPoints/', this.extraPoints)
      .subscribe( extraPoints=> {
        this.extraPoints= extraPoints;
        this.router.navigate(['../'],{relativeTo:this.route});
      });
  }

  lessPoints(){
    if(this.extraPoints['points'] && this.extraPoints['points']>0){
      this.extraPoints['points']-=1;
    } else {
      this.extraPoints['points'] =0;
    }
  }
  morePoints(){
    if(this.extraPoints['points'] ){
      this.extraPoints['points']+=1
    } else {
      this.extraPoints['points']= 1;
    }  
  }
}
