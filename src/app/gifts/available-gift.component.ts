import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";
import { GiftsService } from '../gifts/gifts.service';

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

  update(){ 
     this.service.updateOneGift(this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

  remove(){
      this.service.deleteOneGift(this.gift['id'])
      .subscribe( ()=> this.router.navigate(['../../'],{relativeTo:this.route}))
  }

  chose(){
      this.gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      this.gift['chosenDate']=today;     
      this.service.updateOneGift(this.gift)
       .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
