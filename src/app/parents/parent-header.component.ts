import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";

@Component({
  selector: 'parent-header',
  template: `
  <header *ngIf="kid">	
	<div class="header-banner">{{kid.name}}</div>
	<img src="assets/logo.png" class="logo">
	<nav [ngClass]="{'hide': menuVisible == false }"> 
			<ul class="nav-main">
          <li routerLink="misje" (click)="toggleMenu()">
            <img src="../../assets/mission.svg"> 
            <p>MISJE</p>
          </li>
          <li routerLink="postepy/0" (click)="toggleMenu()">
            <img src="../../assets/odznaki.png"> 
            <p>POSTĘPY</p>
          </li>
          <li routerLink="nagrody" (click)="toggleMenu()">
            <img src="../../assets/gift.svg"> 
            <p>NAGRODY</p>
          </li>
          <li routerLink="punkty" (click)="toggleMenu()">
            <img src="../../assets/addstars.svg"> 
            <p>PUNKTY</p>
          </li>
				</ul>
        <ul ngClass="" class="nav-add">
          <li routerLink='/rodzina/rodzic'>Powrót do listy dzieci</li>  
					<li (click)="goToKid()">Przejdź na stronę dziecka</li>
					<li routerLink='edytuj-dziecko' (click)="toggleMenu()">Edytuj profil dziecka</li>

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
    console.log(this.kidId)
    this.users.currentKid = this.kidId;
    this.router.navigate(['/rodzina/dziecko/'+this.kidId])
   }

  menuVisible = true
  toggleMenu(){ this.menuVisible  = !this.menuVisible}

   constructor(
    private users: UsersService,
    private router: Router,
    private route:  ActivatedRoute,   
  ) { }

  kidId
  ngOnInit() {  
    this.kidId = this.route.snapshot.paramMap.get('kidId');
  }

}
