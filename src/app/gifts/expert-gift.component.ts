import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../gifts/gifts.service';

@Component({
  selector: 'expert-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <button (click)="save()">Dodaj nagrodę</button>
   </div>
  `,
  styles: [],

})
export class ExpertGiftComponent implements OnInit {

  constructor(
    private service: GiftService,
    private router: Router,
    private route: ActivatedRoute,   
  ) { }
  
  gift={};

   ngOnInit(){
      let giftId=this.route.snapshot.paramMap.get('giftId');
      this.service.getOneExpertGift(giftId)
        .subscribe( gift => {
          this.gift['name'] = gift['name'] 
          this.gift['icon'] = gift['icon']
        })
   }

   save(){
    let kidId = +this.route.parent.snapshot.paramMap.get('kidId');
    this.gift['kidId'] = kidId;
    this.gift['status']='unused';
    this.gift['chosenDate']='';
    this.service.createOneGift(this.gift) 
      .subscribe( gift=> {
        this.gift= gift;
        this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }



}
