import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'available-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <button (click)="chose()">Odbierz nagrodę</button>
    <button (click)="update()">Zapisz zmiany</button>
    <button class="altButton" (click)="remove()">Usuń</button>
  </div>
  `,
  styles: [],

})
export class AvailableGiftComponent implements OnInit {

  constructor(
    private service: GiftsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  gift = {};
  giftId

  ngOnInit() {
    this.giftId = this.route.snapshot.paramMap.get('giftId');
    this.service.getOneGift(this.giftId)
      .subscribe( gift => this.gift = gift )
  }

  update(){ 
     this.service.updateOneGift(this.gift,this.giftId)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

  remove(){
      this.service.deleteOneGift(this.giftId)
      .subscribe( ()=> this.router.navigate(['../../'],{relativeTo:this.route}))
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
