import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'kid-chose-gift',
  template: `

  <view-gift [gift]="gift"></view-gift>
  <br>
  <p>Obecny status - {{gift.status}}</p>
  <button (click)="chose()">Odbierz nagrodę</button>
  <button routerLink='../../'>Powrót</button>
  `,
  styles: [],

})
export class KidChoseGiftComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
  ) { }

  gift = {};
  
  ngOnInit() {
    this.gift['id']=this.route.snapshot.paramMap.get('giftId');
    this.http.get(this.API_URL+ 'userGifts/'+this.gift['id'])
      .subscribe( gift => { this.gift = gift;} )
  }

  chose(){
      this.gift['status']='chosen';
      let today = new Date().setHours(0,0,0,0);
      this.gift['chosenDate']=today;
      this.http.put(this.API_URL+ 'userGifts/'+ this.gift['id'], this.gift)
     .subscribe( gift=> {
       this.gift= gift;
       this.router.navigate(['../../'],{relativeTo:this.route});
      });
  }

}
