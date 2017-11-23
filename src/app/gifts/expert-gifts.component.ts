import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'expert-gifts',
  template: `
  <ul class="mission-neutral">

    <li *ngFor="let gift of gifts"
    class="circle-mid"
    [routerLink]="['../dodaj-polecana/' + gift.id]"> 
      <p>{{ gift.name }} </p>
      <img src="{{gift.icon}}">
  </li> 
</ul> 
  `,
  styles: [],
})
export class ExpertGiftsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
    gifts
  
     ngOnInit(){
          this.http.get('http://localhost:3000/expertGifts')
          .subscribe( gifts => this.gifts = gifts )
     }

}
