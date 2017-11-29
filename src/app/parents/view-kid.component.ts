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
