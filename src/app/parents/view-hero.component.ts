import { Component, OnInit, Input} from '@angular/core';
import { KidsService } from "../kids/kids.service";

@Component({
  selector: 'view-hero',
  template: `
  <div class="avatars">
    <p>Wybierz bohatera</p>

    <form>

      <label *ngFor="let expertHero of expertHeroes"
          (click)="selectHero(expertHero)">

        <input type="radio" name="expertHeroes" [checked]="(userHero['name']==expertHero['name'])">
        <img src="{{expertHero.image}}" alt=""/>  
        
      </label> 

    </form>

  </div>  
  `,
  styles: [],

})
export class ViewHeroComponent implements OnInit {

  constructor(   
    private service: KidsService,
  ) { }

  @Input()
  userHero 
  
  expertHeroes

  ngOnInit() {
    this.service.fetchHeroes()
    .subscribe( expertHeroes =>  this.expertHeroes = expertHeroes)
  }

  selectHero(expertHero){
    this.userHero['name']=expertHero['name'];
    this.userHero['image']=expertHero['image'];
    this.userHero['badges1']=expertHero['badges1'];
    this.userHero['badges2']=expertHero['badges2'];
    this.userHero['badges3']=expertHero['badges3'];
  }
  
}
