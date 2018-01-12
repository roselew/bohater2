import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `

  <div class="alert">
  <span class="X" (click)="change.emit()"> X </span>
    <img class="alertImage bounce" src="{{imageSrc}}">
    <h1 *ngIf="textTitle.length>0" class="smallTitle">{{textTitle}}</h1>
    <p>{{textPlain}}</p>
  </div>

  `,
  styles: [],

})
export class AppAlertComponent implements OnInit {

@Input() imageSrc
@Input() textTitle
@Input() textPlain

@Output() 
change = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

}
