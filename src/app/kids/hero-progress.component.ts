import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'hero-progress',
  template: `

  <div class="heroProgress">
    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-done" [ngStyle]="{ 'width' : showProgress[0] + '%'}">
      <p>Szybkość</p> </div>
    </div>

    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-done" [ngStyle]="{ 'width' : showProgress[1] + '%'}">
      <p>Siła</p> </div>
    </div>


    <div class="progress"> 
      <div class="progress-undone"> </div>
      <div class="progress-done" [ngStyle]="{ 'width' : showProgress[2] + '%'}">
      <p>Zwinność</p> </div>
    </div>
  </div>


  `,
  styles: [],

})
export class HeroProgressComponent implements OnInit {

  @Input() heroProgress 
  
  showProgress=[0,0,0];

  constructor() { }

  ngOnInit(){
    for (let i=1; i<101; i++)
      this.doSetTimeout(i)
  }

  doSetTimeout(i){
    let target= this.heroProgress
    setTimeout( () => this.showProgress=this.showProgress.map(function(x,index){ return x=i/100*target[index]}) 
    , 1000 + (i*50));
  }


}
