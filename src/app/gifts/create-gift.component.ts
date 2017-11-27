import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

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
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    ) { }

    kid = {}
    gift={};

    save(){
      this.gift['kidId']=parseInt(this.kid['id']);
      this.gift['status']='unused';
      this.gift['chosenDate']='';
      this.http.post('http://localhost:3000/userGifts/', this.gift)
        .subscribe( gift=> {
          this.gift= gift;
          this.router.navigate(['../'],{relativeTo:this.route});
        });
      }
      
  ngOnInit() {
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
  }

}
