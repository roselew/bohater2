import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <a href="witaj">
	<div class="title-banner">
			<img src="assets/logoXL.png" class="logo">
			<h1>{{simpleH1}}</h1> <br>
      <h1 class="font-skew">{{skewH1}}</h1> 
      <ng-content></ng-content>
	</div>
  </a>
  `,
  styles: [],
})
export class AppHeaderComponent implements OnInit {

  constructor() { }

  @Input() simpleH1

  @Input() skewH1

  ngOnInit() {
  }

}
