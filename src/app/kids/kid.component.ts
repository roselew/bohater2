import { Component, OnInit, Renderer2, Inject } from '@angular/core';
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
    @Inject('API_URL') private API_URL,
    private http: HttpClient,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
    }

    kid
  
    ngOnInit(){
      let kidId = +localStorage.getItem('loggedKid');
      this.http.get(this.API_URL+ 'kids/'+ kidId +'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
        .subscribe( kid => this.kid = kid )
    }
    
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
  }

}
