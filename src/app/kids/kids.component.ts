import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'kids',
  template: `
      <input class="form-control" placeholder="Wpisz zapytanie..." ngModel (ngModelChange)="search($event)">
      <table>
        <tr *ngFor="let kid of kids"> 
          <td [routerLink]="[kid.id]">{{ kid.name }}</td>
          <td> <button (click)="remove(kid.id)">X</button> </td>
        </tr>
      </table>

      <button routerLink="/parents"> Widok rodzica </button>

  `,
  styles: [],
})
export class KidsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  kids

   ngOnInit(){
        this.fetch()
   }

   fetch(){
        this.http.get('http://localhost:3000/kids')
        .subscribe( kids => this.kids = kids )
    }

   remove(id){
       this.http.delete('http://localhost:3000/kids/'+id)
       .subscribe(()=>this.fetch())
   }

  search(query){
    if(query){
      // Gdy zapytanie nie jest puste  - pytamy serwer
      this.http.get('http://localhost:3000/kids/?q='+query)
      // aktualizujemy liste
      .subscribe(kids => this.kids = kids)
    }else{
      // Gdy pole jest puste - wyswietlamy wszystko
      this.fetch()
    }
  }

}
