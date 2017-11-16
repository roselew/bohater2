import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'progress',
  template: `
 <p> test </p>

  `,
  styles: [],
})

export class ProgressComponent implements OnInit {


  constructor(
    private router: Router,
    private route:ActivatedRoute, 
  ) { }



  ngOnInit() {



  }



}
