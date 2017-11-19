import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'kid',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class KidComponent implements OnInit {

  constructor(
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'kid')
    }

    ngOnInit(){}
    
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'kid');
  }

}
