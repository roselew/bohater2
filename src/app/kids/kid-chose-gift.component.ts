import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'kid-chose-gift',
  template: `

  <view-gift [gift]="gift"></view-gift>
  <br>
  <p>Obecny status - {{gift['status']}}</p>
  <button (click)="chose()">Odbierz nagrodę</button>
  <button routerLink='../../'>Powrót</button>
  `,
  styles: [],

})
export class KidChoseGiftComponent implements OnInit {

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

  chose(){
      this.gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      this.gift['chosenDate']=today;
      this.service.updateOneGift(this.gift,this.giftId)
        .subscribe( gift=> {
        this.gift= gift;
        this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
