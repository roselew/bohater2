import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'parent',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ParentComponent implements OnInit {

  constructor(
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'parent')
    }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'parent');
  }
  ngOnInit(){}
}
