import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'chosen-gift',
  template: `

  <view-gift [gift]="gift"></view-gift>
  <br>
  <p>Obecny status - {{gift.status}}</p>
  <button (click)="receive()">Potwierdź odbiór nagrody</button>

  <button (click)="update()">Zapisz zmiany</button>
  <button (click)="remove()">Usuń</button>
  <button routerLink='../../'>Powrót</button>
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

  receive(){
      this.gift['status']='received';
      this.http.put('http://localhost:3000/userGifts/'+ this.gift['id'], this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
