import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `

  <div class="alert">
    <span class="X" (click)="hideAlert()"> X </span>
    <img src="{{imageSrc}}">
    <p class="smallTitle">{{textTitle}}</p>
    <p>{{textPlain}}</p>
  </div>

  `,
  styles: [],

})
export class AppAlertComponent implements OnInit {

@Input() imageSrc
@Input() textTitle
@Input() textPlain
@Input() showAlert


hideAlert(){
  this.showAlert=false
  console.log(this.showAlert)
}

  constructor() { }

  ngOnInit() {
  }

}
