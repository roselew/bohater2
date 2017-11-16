import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'create-kid',
  template: `

   <view-kid [kid]="kid"></view-kid>
   <br>
   <button (click)="save()">Zapisz</button>
   <button routerLink="../">Powrót</button>

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    ) { }

  parentId
  kid={};
  

  save(){
  this.kid['parentId']=parseInt(this.parentId);
  this.http.post('http://localhost:3000/kids/', this.kid)
    .subscribe( kid=> {this.kid= kid; this.router.navigate(['/rodzic/dziecko/',this.kid['id']]);});
  }

  ngOnInit() {
    this.parentId = parseInt(localStorage.getItem('loggedParent'));
  }

}
