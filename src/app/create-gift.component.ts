import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'create-gift',
  template: `
  <label>Name</label>
  <input [(ngModel)]="gift.name">
  <label>Points</label>
  <input [(ngModel)]="gift.points">
  <label>Icon</label>
  <input [(ngModel)]="gift.icon">

  <button (click)="save()">Save</button>
  <button (click)="goBack()">Powrót</button>

  `,
  styles: [],

})
export class CreateGiftComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    ) { }

    kid = {}
    gift={};

    save(){
      this.gift['kidId']=this.kid['id'];
      this.http.post('http://localhost:3000/userGifts/', this.gift)
        .subscribe( gift=> {this.gift= gift; this.goBack(); this.goBack();});
      }
  ngOnInit() {
    this.kid['id']=this.route.snapshot.paramMap.get('kidId');
  }
  goBack(){
    this.location.back();
  }
}
