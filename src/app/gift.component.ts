import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'gift',
  template: `

  <label>Name</label>
  <input [(ngModel)]="gift.name">
  <label>Points</label>
  <input [(ngModel)]="gift.points">
  <label>Icon</label>
  <input [(ngModel)]="gift.icon">

<button (click)="update()">Zapisz zmiany</button>
<button (click)="remove()">Usuń</button>
<button (click)="goBack()">Powrót</button>
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
     .subscribe( gift=> {this.gift= gift; this.goBack();});
  }

  remove(){
      this.http.delete('http://localhost:3000/userGifts/'+ this.gift['id'])
      .subscribe( ()=> this.goBack())
  }

  goBack(){
    this.location.back();
  }

}
