import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    @Inject('API_URL') private API_URL,
    private http: HttpClient,
  ) { }

  @Input()
  userHero 
  
  expertHeroes

  ngOnInit() {
    this.http.get(this.API_URL+ 'expertHeroes')
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
