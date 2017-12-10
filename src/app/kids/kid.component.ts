import { Component, OnInit, Renderer2} from '@angular/core';
import { GiftsService } from "../services/gifts.service";
import { UsersService } from "../services/users.service";

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
    private users: UsersService,
    private service: GiftsService,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
    }

    kid
  
    ngOnInit(){
      let kidId = this.users.getLoggedUser('kid');
      this.users.getOneKid(kidId)
        .subscribe( kid => this.kid = kid )
    }
    
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
  }

}
