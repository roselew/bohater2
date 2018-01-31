import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from "../services/gifts.service";

@Component({
  selector: 'extra-points',
  template: `


<img src="assets/logoXL.png" width="100px" height="100px">

<form class="">

	<input type="text" name="newMissionName" placeholder="Za co punkty?" [(ngModel)]="extraPoints['description']">
	<span class="less" (click)="lessPoints()">-</span><input type="number" name="newMissionPoints" placeholder="Ile punktów" [(ngModel)]="+extraPoints['points']"><span class="more" (click)="morePoints()">+</span>
	<button (click)="save()">DODAJ PUNKTY</button>

</form>

  `,
  styles: [],

})
export class ExtraPointsComponent implements OnInit {

  constructor(    
    private service: GiftsService,
    private router: Router,
    private route:ActivatedRoute,
    ) { }

  kid = {};
  extraPoints={}

  ngOnInit(){ }

   save(){
    let kidId = this.route.parent.snapshot.paramMap.get('kidId');
    this.extraPoints['kidId']= kidId;
    let today = new Date().setHours(0,0,0,0);
    this.extraPoints['date']=today;
    this.service.addExtraPoints(this.extraPoints)
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
