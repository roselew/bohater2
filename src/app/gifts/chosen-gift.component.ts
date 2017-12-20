import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';

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
    private service: GiftsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  gift = {};
  giftId

  ngOnInit() {
    this.giftId = this.route.snapshot.paramMap.get('giftId');
    this.service.getOneGift(this.giftId)
      .subscribe( gift => this.gift = gift)
  }

   receive(){
      this.gift['status']='received';
      this.service.updateOneGift(this.gift, this.giftId)
       .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
