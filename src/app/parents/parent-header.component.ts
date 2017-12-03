import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'parent-header',
  template: `
  <header>	
	<div class="header-banner">{{kid.name}}</div>
	<img src="assets/logo.png" class="logo">
	<nav id="menu"> 
			<ul class="nav-main">
					<li><a routerLink="misje">MISJE</a></li>
					<li><a routerLink="postepy/0">POSTĘPY</a></li>
          <li><a routerLink="nagrody">NAGRODY</a></li>
          <li><a routerLink="punkty">PUNKTY</a></li>
				</ul>
				<ul class="nav-add">
					<li (click)="goToKid()">Przejdź na stronę dziecka</li>
					<li><a routerLink="edytuj-dziecko">Ustawienia profilu dziecka</a></li>
					<li><a routerLink='/rodzic'>Przełącz dziecko</a></li>
				</ul>
    </nav>
	<label for="nav" (click)="showMenu()"></label>
</header>
  `,
  styles: [`   
  nav{
    display: none;
  }
  `


],

})
export class ParentHeaderComponent implements OnInit {

  @Input()
  kid

  goToKid(){
    localStorage.clear()
    localStorage.setItem('loggedKid',this.kid['id'])
    this.router.navigate(['/dziecko'])
   }

   showMenu(){
    if (document.querySelector('nav').style.display=="none"){
     document.querySelector('nav').style.display = "block";
   } else {
    document.querySelector('nav').style.display = "none";
   }
  }

   constructor(
    private router: Router,
    private route:  ActivatedRoute,   
  ) { }

  ngOnInit() {
  }

}
