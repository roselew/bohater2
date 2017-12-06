import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kid',
  template: `
    <kid-header routerLink='menu' [kid]="kid"></kid-header>
    <div class="container">
    <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class KidComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
    }

    kid={}
    ngOnInit(){
      this.kid['id'] = +localStorage.getItem('loggedKid');
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
        .subscribe( kid => {
          this.kid = kid;
        })
    }
    
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
  }

}
