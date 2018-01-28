import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kid-header',
  template: `
  <header [routerLink]="['/rodzina/dziecko/'+kidId+'/menu']">
    <div *ngIf="kid" class="header-banner"> {{kid.name}} </div>
    <img src="../../assets/logoXL.png" class="logo">
  </header>
  `,
  styles: [],

})
export class KidHeaderComponent implements OnInit {

  @Input()
  kid

  constructor(    
    private route:ActivatedRoute
  ) { }

  kidId
  ngOnInit() {
    this.kidId = this.route.snapshot.paramMap.get('kidId');
  }

}
