import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

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
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
  ) { }

  gift = {};
  ngOnInit() {
    this.gift['id']=this.route.snapshot.paramMap.get('giftId');
    this.http.get('http://localhost:3000/userGifts/'+this.gift['id'])
      .subscribe( gift => { this.gift = gift;} )
  }

  update(){
     this.http.put('http://localhost:3000/userGifts/'+ this.gift['id'], this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../'],{relativeTo:this.route});
      });
  }

  remove(){
      this.http.delete('http://localhost:3000/userGifts/'+ this.gift['id'])
      .subscribe( ()=> this.router.navigate(['../'],{relativeTo:this.route}))
  }


}
