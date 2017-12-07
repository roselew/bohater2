import { Component, OnInit, Renderer2} from '@angular/core';
import { GiftsService } from "../gifts/gifts.service";

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
    private service: GiftsService,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
    }

    kid
  
    ngOnInit(){
      let kidId = +localStorage.getItem('loggedKid');
      this.service.getMissionsGiftsPoints(kidId)
        .subscribe( kid => this.kid = kid )
    }
    
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
  }

}
