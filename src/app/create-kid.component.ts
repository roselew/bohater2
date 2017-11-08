import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'create-kid',
  template: `

   <label>Name</label>
   <input [(ngModel)]="kid.name">
   <button (click)="save()">Save</button>
   <button (click)="goBack()">Powrót</button>

  `,
  styles: [],
})
export class CreateKidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    ) { }

  parent = {}
  kid={};
  

  save(){
  this.kid['parentId']=this.parent['id'];
  this.http.post('http://localhost:3000/kids/', this.kid)
    .subscribe( kid=> {this.kid= kid; this.goBack();});
  }

  ngOnInit() {
    this.parent['id']=this.route.snapshot.paramMap.get('parentId');
  }

   goBack(){
     this.location.back();
   }
}
