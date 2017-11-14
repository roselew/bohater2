import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'edit-kid',
  template: `
      <label>Name</label>
      <input [(ngModel)]="kid.name">
      <button (click)="update()">Zapisz</button>
      <button (click)="remove()">Usuń</button>  
      <button routerLink="../">Powrót do dziecka </button>


  `,
  styles: [],

})
export class EditKidComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
    private location:Location,
    
  ) { }

  kid = {};

   ngOnInit(){
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => this.kid = kid )
   }

   update(){
      this.http.put('http://localhost:3000/kids/'+ this.kid['id'], this.kid)
      .subscribe( kid=> {this.kid= kid; this.goBack();});
   }

   remove(){
       this.http.delete('http://localhost:3000/kids/'+ this.kid['id'])
       .subscribe( ()=> this.goBack())
   }

   goBack(){
     this.location.back();
   }

}
