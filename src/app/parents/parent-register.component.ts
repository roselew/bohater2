import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'parent-register',
  template: `

  <app-header></app-header>

  <div class="title-container">
  
    <form action='rodzic_login.html'>
    
      <input type='text' placeholder='E-mail' [(ngModel)]="parent['email']" name="email">

      <input type='password' placeholder='Hasło' [(ngModel)]="parent['password']" name="password">

      <input type='password' placeholder='Powtórz Hasło' [(ngModel)]="checkpassword" name="checkpassword">

      <input type="radio" name="parent-name" id="parent-left"><label for="parent-left" class="double">Jestem Tatą</label>
      <input type="radio" name="parent-name" id="parent-right"><label for="parent-right" class="double">Jestem Mamą</label>

      <button type='submit' (click)="addParent()">ZAREJESTRUJ</button>

    </form>

  </div>
  `,
  styles: [],

})
export class ParentRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
      this.renderer.addClass(document.body,'title-page')
    }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
    this.renderer.removeClass(document.body, 'title-page');
  }

  checkpassword
  parent ={}
  addParent(){
     if (this.parent['password']===this.checkpassword){
      this.http.post('http://localhost:3000/parents/', this.parent)
      .subscribe( parent => { 
        this.parent = parent; 
        this.router.navigate(['/rodzic-logowanie']);
      } )
    } 
  }
  


}
