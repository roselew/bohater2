import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";

@Component({
  selector: 'kid-login',
  template: `

  
  <app-header [simpleH1]="'Dziecko'" [skewH1]="'Logowanie'"></app-header> 
  
  <div class="title-container">
  
    <div class="code-box">
      <label *ngFor="let code of codes">
        <input type="checkbox"
                value="{{code.value}}"
                [(ngModel)]="code.checked"
                name="code.name"
                (ngModelChange)="show()"
        >
        <span>★</span>    
      </label>     
    </div>

    <a [routerLink]="['/rodzina']">
      <div class="back">←</div>
    </a>

  </div>

  `,
  styles: [],

})
export class KidLoginComponent implements OnInit {


  constructor(
    public users: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
      this.renderer.addClass(document.body,'title-page')
    }

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
  
    show () {
      let a1 = this.codes.filter(x => x.checked==true).map(x => x.value);
      let a2 = this.kid['code'];
   
      if (a1.length==a2.length && a1.every((v,i)=> v === a2[i])) {
         this.showSpinner = true
         this.users.currentKid = this.kidId
         this.router.navigate(['rodzina/dziecko/'+this.kidId])
      }
    }


  showSpinner: boolean = false

  kid
  kidId
  ngOnInit() {
    this.kidId  = this.users.toLogUser
    this.users.getOneKid(this.kidId)
    .subscribe( kid => this.kid = kid)
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }
}
