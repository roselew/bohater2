import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-header',
  template: `
    <p>{{kid.name}}</p>
  `,
  styles: [],
})
export class MyHeaderComponent implements OnInit {


@Input()
kid 

  constructor() { }

   ngOnInit(){}

}
