import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'edit-kid',
  template: `
      <view-kid *ngIf="kid" [kid]="kid"></view-kid>
     
      <button (click)="update()">Zapisz</button>
      <button class="altButton" (click)="remove()">Usuń</button>  
      <button class="altButton" routerLink="../">Powrót do dziecka </button>
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

   ngOnInit(){
      let kidId = this.route.parent.snapshot.paramMap.get('kidId');
      this.users.getOneKid(kidId)
      .subscribe( kid => {
        this.kid = kid;
      })
   }

   update(){
     this.users.updateOneKid(this.kid)
      .subscribe( kid=> {
        this.kid= kid;
        this.router.navigate(['/rodzic'])
      });
   }

   remove(){
     this.users.deleteOneKid(this.kid.login)
   }


}
