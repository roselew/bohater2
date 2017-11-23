import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <a href="index.html">
	<div class="title-banner">
			<img src="assets/logoXL.png" class="logo">
			<h1>Bohater</h1> <br>
			<h1 class="font-skew">Tygodnia</h1> 
		</div>
  </a>
  `,
  styles: [],
})
export class AppHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
