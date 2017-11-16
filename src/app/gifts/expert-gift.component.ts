import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'expert-gift',
  template: `

  <view-gift [gift]="gift"></view-gift>
  <br>
  <button (click)="save()">Save</button>
   <button routerLink='../../'>Powrót</button>
  `,
  styles: [],

})
export class ExpertGiftComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }
  kid = {}
  gift={};

   ngOnInit(){
      let id=this.route.snapshot.paramMap.get('giftId');
      this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/expertGifts/'+id)
        .subscribe( gift => {
          this.gift['name'] = gift['name'] 
          this.gift['icon'] = gift['icon']
        })
   }

   save(){
    this.gift['kidId']=parseInt(this.kid['id']);
    this.gift['status']='unused';
    this.gift['chosenDate']='';
    this.http.post('http://localhost:3000/usergifts/', this.gift)
      .subscribe( gift=> {
        this.gift= gift;
        this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }



}
