import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'edit-kid',
  template: `

      <app-spinner *ngIf="showSpinner"></app-spinner>

      <view-kid *ngIf="!showSpinner && kid" [kid]="kid" [codes]="codes"></view-kid>
     
      <button *ngIf="!showSpinner" (click)="update()">Zapisz</button>
      <button *ngIf="!showSpinner" class="altButton" (click)="remove()">Usuń</button>  
      <button *ngIf="!showSpinner" [routerLink]="['../']" class="altButton" >Powrót</button>  

  `,
  styles: [],

})
export class EditKidComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  kid 
  kidId
  showSpinner: boolean = false

  codes=[
    {name: 'code1', value: 0, checked: false},
    {name: 'code2', value: 1, checked: false},
    {name: 'code3', value: 2, checked: false},
    {name: 'code4', value: 3, checked: false},
    {name: 'code5', value: 4, checked: false},
    {name: 'code6', value: 5, checked: false},
    {name: 'code7', value: 6, checked: false},
    {name: 'code8', value: 7, checked: false},
    {name: 'code9', value: 8, checked: false}
  ];

   ngOnInit(){
      this.kidId = this.route.parent.snapshot.paramMap.get('kidId');
      this.users.getOneKid(this.kidId)
      .subscribe( kid => {
        this.kid = kid;
        for (let code of this.kid['code']) {
          this.codes.map(opt => {if (opt.value===code){opt.checked=true}})
        }
      })
   }

   update(){
     this.showSpinner = true
     this.kid['code']=this.codes.filter(x => x.checked==true).map(x => x.value);
     this.users.updateOneKid(this.kid,this.kidId)
      .then ( () => this.router.navigate(['/rodzina/rodzic']) );
   }

   remove(){
     this.showSpinner = true
     this.users.deleteOneKid(this.kidId)
     .then ( () => this.router.navigate(['/rodzina/rodzic']) );
   }


}
