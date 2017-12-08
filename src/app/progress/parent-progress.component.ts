import { Component, OnInit} from '@angular/core';

@Component({  

selector: 'parent-progress',  
template: `
  <one-week [mode]=" 'parent' "></one-week>
`,  
styles: [],

})

export class ParentProgressComponent implements OnInit {
  constructor() { }
  ngOnInit() {  }
  
}
