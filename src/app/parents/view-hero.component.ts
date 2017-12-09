import { Component, OnInit, Input} from '@angular/core';
import { ExpertsService } from "../services/experts.service";

@Component({
  selector: 'view-hero',
  template: `

  `,
  styles: [],

})
export class ViewHeroComponent implements OnInit {

  constructor(   
    private experts: ExpertsService,
  ) { }

  @Input()
  userHeroId 
  
  expertHeroes

  ngOnInit() {
    this.expertHeroes = this.experts.getExpertHeroes()
  }

  selectHero(expertHero){
    this.userHeroId=expertHero['id'];
    console.log(this.userHeroId)
  }
  
}
