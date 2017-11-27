import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'available-gift',
  template: `
  <div class="edit">
    <span class="X" routerLink='../../'> X </span>
    <view-gift [gift]="gift"></view-gift>
    <p>Obecny status - {{gift['status']}}</p>
    <button (click)="chose()">Odbierz nagrodę</button>
    <button (click)="update()">Zapisz zmiany</button>
    <button class="altButton" (click)="remove()">Usuń</button>
  </div>
  `,
  styles: [],

})
export class AvailableGiftComponent implements OnInit {

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
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

  remove(){
      this.http.delete('http://localhost:3000/userGifts/'+ this.gift['id'])
      .subscribe( ()=> this.router.navigate(['../../'],{relativeTo:this.route}))
  }

  chose(){
      this.gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      this.gift['chosenDate']=today;
      this.http.put('http://localhost:3000/userGifts/'+ this.gift['id'], this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
