import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'one-kid',
  template: `

   <parent-header [kid]="kid"></parent-header>
   <div class="container" id="panel">
    <router-outlet></router-outlet>
   </div>
  `,

})
export class OneKidComponent implements OnInit {

  constructor(
    @Inject('API_URL') private API_URL,
    private router: Router,
    private http:   HttpClient,
    private route:  ActivatedRoute,   
  ) { }

  parentId
  kid = {};

   ngOnInit(){
      let kidId = +this.route.snapshot.paramMap.get('kidId');
      
      this.http.get(this.API_URL+ 'kids/'+ kidId)
        .subscribe( kid => {
          this.kid = kid;
          this.parentId = this.kid['parentId']; 
        })
   }



}
