import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../services/users.service";

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
    private users: UsersService,
    private router: Router,
    private route:  ActivatedRoute,   
  ) { }

  parentId
  kid = {};

   ngOnInit(){
      let kidId = +this.route.snapshot.paramMap.get('kidId');

      this.users.getOneKid(kidId)
        .subscribe( kid => {
          this.kid = kid;
          this.parentId = this.kid['parentId']; 
        })
   }

}
