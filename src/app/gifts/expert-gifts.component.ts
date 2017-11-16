import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'expert-gifts',
  template: `
  <ul> 
  <li *ngFor="let gift of gifts"
  [routerLink]="['../dodaj-polecana/' + gift.id]"
  > 
    {{ gift.name }} 
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
