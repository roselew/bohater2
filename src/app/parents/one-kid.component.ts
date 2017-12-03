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
    private router: Router,
    private http:   HttpClient,
    private route:  ActivatedRoute,   
  ) { }

  parentId
  kid = {};

   ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => {
          this.kid = kid;
          this.parentId = this.kid['parentId']; 
        })
   }



}
