import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'parent-header',
  template: `
  <header>	
	<div class="header-banner">{{kid.name}}</div>
	<img src="assets/logo.png" class="logo">
	<nav [ngClass]="{'hide': menuVisible == false }"> 
			<ul class="nav-main">
					<li><a routerLink="misje" (click)="toggleMenu()">MISJE</a></li>
					<li><a routerLink="postepy/0" (click)="toggleMenu()">POSTĘPY</a></li>
          <li><a routerLink="nagrody" (click)="toggleMenu()">NAGRODY</a></li>
          <li><a routerLink="punkty" (click)="toggleMenu()">PUNKTY</a></li>
				</ul>
				<ul ngClass="" class="nav-add">
					<li (click)="goToKid()">Przejdź na stronę dziecka</li>
					<li><a routerLink="edytuj-dziecko" (click)="toggleMenu()">Ustawienia profilu dziecka</a></li>
					<li><a routerLink='/rodzic'>Przełącz dziecko</a></li>
				</ul>
    </nav>
	<label for="nav" (click)="toggleMenu()"></label>
</header>
  `,
  styles: [`   
  nav.hide {
    transform: translateX(0);
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

  menuVisible = true
  toggleMenu(){ this.menuVisible  = !this.menuVisible}

   constructor(
    private router: Router,
    private route:  ActivatedRoute,   
  ) { }

  ngOnInit() {
  }

}
