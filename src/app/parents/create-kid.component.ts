import { Component, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { FirebaseService } from '../services/firebase.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'create-kid',
  template: `

  <app-header [simpleH1]="'Dodaj'" [skewH1]="'Dziecko'"></app-header> 
   
   <div class="title-container">

      <app-spinner *ngIf="showSpinner"></app-spinner>

      <view-kid *ngIf="!showSpinner" [kid]="kid"></view-kid>

    <button (click)="save()">DODAJ DZIECKO</button>
    <button class="altButton" routerLink="../">Powrót</button>

  </div>

  

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
    }
    
    ngOnDestroy() {
      this.renderer.removeClass(document.body, 'title-page');
    }

  expertHeroes
  kid={};
  userHeroId

  showSpinner: boolean = false

  save(){
    if (this.kid['password']===this.kid['checkpassword']){
      this.showSpinner = true
      let parentId = this.users.currentUserEmail;
      this.kid['parentId']=parentId;
      this.kid['badges']=[false,false,false,false,false,false,false,false,false]
      this.users.kidRegister(this.kid)
      .then( () => this.showSpinner = false )
    } else {
      alert('Upewnij się czy dobrze wpisałeś hasło')
      this.showSpinner = false 
    }
  }

  ngOnInit() { 
  }


}
