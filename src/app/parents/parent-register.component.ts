import { Component, OnInit, Renderer2} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'parent-register',
  template: `

  <app-header [simpleH1]="'Rodzic'" [skewH1]="'Rejestracja'"></app-header> 

  <div class="title-container">

  <app-spinner *ngIf="showSpinner"></app-spinner>
  
    <form #formRef="ngForm" (ngSubmit)="register(formRef)" *ngIf="!showSpinner" >
    
      <span class="info">
        Ten adres mailowy będzie wykorzystywać cała Wasza rodzina do zalogowania się.
      </span> 

      <span class="info info__alert" *ngIf="(email.touched || email.dirty) && email.invalid">
        Błędny adres email
      </span> 

      <input type='text' placeholder='E-mail' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required [(ngModel)]="parent['email']" name="email" #email="ngModel" >

      <span class="info">
        To jest hasło <b>wspólne</b> dla całej rodziny
      </span> 

      <span class="info info__alert" *ngIf="(password.touched || password.dirty) && password.invalid">
        Hasło musi zawierać minimum 6 znaków
      </span> 

      <input type='password' placeholder='Hasło' pattern=".{6,}" [(ngModel)]="parent['password']" #password="ngModel" name="password" required>
      
      <span class="info info__alert" *ngIf="(password2.touched || password2.dirty) && parent['password']!==checkpassword">
        Podano różne hasła
      </span> 

      <input type='password' placeholder='Powtórz Hasło' pattern=".{6,}" [(ngModel)]="checkpassword" #password2="ngModel" name="checkpassword" required>

      <span class="info" *ngIf="formRef.valid">
        Kto będzie sprawdzać wykonanie misji? Jeśli mama i tata na zmianę wybierz <b>Rodzic</b>
      </span> 

      <div class="triple-radio" *ngIf="formRef.valid">
        <input type="radio" [(ngModel)]="parent['gender']" value="tata" name="parent-name" id="parent-left"><label for="parent-left" class="triple">Tata</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="mama" name="parent-name" id="parent-center"><label for="parent-center" class="triple">Mama</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="rodzic" name="parent-name" id="parent-right"><label for="parent-right" class="triple">Rodzic</label>
      </div>     

      <span class="info" *ngIf="formRef.valid && parent['gender']">
        Dostęp do profilu rodzica można dodatkowo zabezpieczyć hasłem przed dziećmi. 
      </span> 

      <div class="double-radio" *ngIf="formRef.valid && parent['gender']">
        <input type="radio" [(ngModel)]="parent['codeExist']" value="T" name="codeExist" id="code-left"><label for="code-left" class="double">Z hasłem</label>
        <input type="radio" [(ngModel)]="parent['codeExist']" value="F" name="codeExist" id="code-right"><label for="code-right" class="double">Bez hasła</label>
      </div>
      
      <div *ngIf="parent['codeExist'] == 'T'" class="code-box">
        <label *ngFor="let code of codes">
          <input type="checkbox"
                  value="{{code.value}}"
                  [(ngModel)]="code.checked"
                  name="code.name"
          >
          <span>★</span>    
        </label>     
      </div>

      <button *ngIf="formRef.valid && parent['gender'] && parent['codeExist'] && parent['password']===checkpassword" type='submit'>ZAREJESTRUJ</button>

    </form>

    <a [routerLink]="['/rodzina']">
      <div class="back">←</div>
    </a>

  </div>
  `,
  styles: [``],

})
export class ParentRegisterComponent implements OnInit {

  constructor(
    private users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
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

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
    this.renderer.removeClass(document.body, 'title-page');
  }



  checkpassword
  parent ={}
  showSpinner: boolean = false

  register(form){

     if (this.parent['password']===this.checkpassword){
       if (form.invalid){
         console.log('cos jest zle')
       } else {
        this.showSpinner = true;
        this.parent['code']=this.codes.filter(x => x.checked==true).map(x => x.value);
        this.users.parentRegister(this.parent)
        .then ( user => {
          this.users.createOneParent(user,this.parent)
            .then( ()=> this.router.navigate(['/rodzina']) )
            .catch( error => {alert(error.messageng ); this.showSpinner = false;} )
          })
        .catch(error => {alert(error.message); this.showSpinner = false;} );
       }
      } else {
        alert('Hasło się nie zgadza')
      }
  } 

  }
  



