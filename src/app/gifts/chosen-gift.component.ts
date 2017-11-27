import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'chosen-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <p>Obecny status - {{gift['status']}}</p>
    <button (click)="receive()">Potwierdź odbiór nagrody</button>
  </div>
  `,
  styles: [],

})
export class ChosenGiftComponent implements OnInit {

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

   receive(){
      this.gift['status']='received';
      this.http.put('http://localhost:3000/userGifts/'+ this.gift['id'], this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
