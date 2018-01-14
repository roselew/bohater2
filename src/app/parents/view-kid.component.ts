import { Component, OnInit, Input } from '@angular/core';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'view-kid',
  template: `
  <form>
	<input type='text' placeholder='Imie' [(ngModel)]="kid.name" name="name">
  
      <input class="kr-date" type='text' placeholder='Rok urodzenia' [(ngModel)]="kid.birth" name="birth">
      
      <input type="radio" [(ngModel)]="kid.gender" value="M" name="kids-gender" id="gender-left"><label for="gender-left" class="double">Chłopiec</label>
      <input type="radio" [(ngModel)]="kid.gender" value="F" name="kids-gender" id="gender-right"><label for="gender-right" class="double">Dziewczynka</label>
  
      </form>

      <div *ngIf="kid.gender" class="avatars">

        <p>Wybierz bohatera</p>

        <form *ngIf="kid.gender == 'M'">

          <label *ngFor="let expertHero of expertHeroesM"
              (click)="selectHero(expertHero)">

            <input type="radio" name="expertHeroes" [checked]="(kid['heroId']==expertHero['id'])">
            <img src="{{expertHero.image}}" alt=""/>  
            
          </label> 

        </form>

        <form *ngIf="kid.gender == 'F'">
        
          <label *ngFor="let expertHero of expertHeroesF"
              (click)="selectHero(expertHero)">

            <input type="radio" name="expertHeroes" [checked]="(kid['heroId']==expertHero['id'])">
            <img src="{{expertHero.image}}" alt=""/>  
            
          </label> 
        
        </form>
      </div>  


      <input type="radio" [(ngModel)]="kid.codeExist" value="T" name="code-exist" id="code-left"><label for="code-left" class="double">Z hasłem</label>
      <input type="radio" [(ngModel)]="kid.codeExist" value="F" name="code-exist" id="code-right"><label for="code-right" class="double">Bez hasła</label>
      
        <div *ngIf="kid.codeExist == 'T'" class="code-box">
          <label *ngFor="let code of codes">
            <input type="checkbox"
                    value="{{code.value}}"
                    [(ngModel)]="code.checked"
                    name="code.name"
            >
            <span>★</span>    
          </label>     
        </div>
  


  `,
  styles: [],

})
export class ViewKidComponent implements OnInit {

@Input() kid 
@Input() codes

expertHeroesF
expertHeroesM


  constructor(
    private experts: ExpertsService,
  ) { }

  ngOnInit() { 
    this.expertHeroesF = this.experts.getExpertHeroes("F")
    this.expertHeroesM = this.experts.getExpertHeroes("M")
    
   }

  selectHero(expertHero){
    this.kid['heroId']=expertHero['id'];
  }
  

}
