import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'create-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <button (click)="save()">Dodaj nagrodę</button>
  </div>
  `,
  styles: [],

})
export class CreateGiftComponent implements OnInit {

  constructor(
    private service: GiftsService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

    gift={};

    save(){
      let kidId = this.route.parent.snapshot.paramMap.get('kidId');
      this.gift['kidId'] = kidId;
      this.gift['status']='unused';
      this.gift['chosenDate']='';
      this.service.createOneGift(this.gift)
        .subscribe( gift=> {
          this.gift= gift;
          this.router.navigate(['../'],{relativeTo:this.route});
        });
      }
      
  ngOnInit() { }

}
