import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'view-kid',
  template: `
  <form>
	<input type='text' placeholder='Imie' [(ngModel)]="kid.name" name="name">
  
      <input class="kr-date" type='text' placeholder='Rok urodzenia' [(ngModel)]="kid.birth" name="birth">
  
      <input type='text' placeholder='Login dziecka' [(ngModel)]="kid.login" name="login">
  
      <input type='password' placeholder='Hasło dziecka' [(ngModel)]="kid.password" name="password">
  
      <input type='password' placeholder='Powtórz hasło dziecka' [(ngModel)]="checkpassword" name="checkpassword">
  
      <input type="radio" name="kids-gender" id="gender-left"><label for="gender-left" class="double">Chłopiec</label>
      <input type="radio" name="kids-gender" id="gender-right"><label for="gender-right" class="double">Dziewczynka</label>
  
      <div id="avatars">
        <p class="kr-bohater-text">Wybierz bohatera</p>
        <form action='rodzic_menu.html'>
          <label class="avatars">
              <input class="kr-bohater" type="radio" name="avatar"/>
            <img src="./assets/bohater.png" alt=""/>  
          </label> 
  
          <label class="avatars">
              <input class="kr-bohater" type="radio" name="avatar"/>
              <img src="./assets/bohater2.png" alt=""/>
          </label>
          <label class="avatars">
              <input class="kr-bohater" type="radio" name="avatar"/>
              <img src="./assets/bohater3.png" alt=""/>
          </label>
  
          </form>
      </div>  

      </form>

   
  `,
  styles: [],

})
export class ViewKidComponent implements OnInit {

@Input()
kid 

checkpassword
  constructor() { }

  ngOnInit() {
  }

}
