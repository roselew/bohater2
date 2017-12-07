import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";
import { GiftsService } from '../gifts/gifts.service';

@Component({
  selector: 'chosen-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <button (click)="receive()">Potwierdź odbiór nagrody</button>
  </div>
  `,
  styles: [],

})
export class ChosenGiftComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private service: GiftService,
    private router: Router,
    private route:ActivatedRoute,
    private location:Location,
  ) { }

  gift = {};
  ngOnInit() {
    let giftId = +this.route.snapshot.paramMap.get('giftId');
    this.service.getOneGift(giftId)
      .subscribe( gift => this.gift = gift; )
  }

   receive(){
      this.gift['status']='received';
      this.service.updateOneGift(this.gift)
       .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
