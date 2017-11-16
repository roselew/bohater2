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

  parent = {}
  kid={};
  

  save(){
  this.kid['parentId']=parseInt(this.parent['id']);
  this.http.post('http://localhost:3000/kids/', this.kid)
    .subscribe( kid=> {this.kid= kid; this.router.navigate(['/kids/',this.kid['id']]);});
  }

  ngOnInit() {
    this.parent['id']=this.route.parent.snapshot.paramMap.get('parentId');
  }

}
