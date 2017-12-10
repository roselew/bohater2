import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <p>Obecny status - {{gift['status']}}</p>
    <button (click)="update()">Zapisz zmiany</button>
    <button class="altButton" (click)="remove()">Usuń nagrodę</button>
  </div>
   `,
  styles: [],

})
export class GiftComponent implements OnInit {

  constructor(
    private service: GiftsService,
    private router: Router,
    private route:ActivatedRoute,
  ) { }

  gift = {};
  
  ngOnInit() {
    let giftId = +this.route.snapshot.paramMap.get('giftId');
    this.service.getOneGift(giftId)
      .subscribe( gift => this.gift = gift)
  }

  update(){
     this.service.updateOneGift(this.gift)
      .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../'],{relativeTo:this.route});
      });
  }

  remove(){
      this.service.deleteOneGift(this.gift['id'])
      .subscribe( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
  }


}
