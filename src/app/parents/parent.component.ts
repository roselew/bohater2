import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'parent',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class ParentComponent implements OnInit {

  constructor() { }
  ngOnInit(){}
}
