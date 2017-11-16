import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'points',
  template: `
  <p>Historia</p>
  <table> 
  <thead>
    <td>Data</td>
    <td>Typ</td>
    <td>Nazwa</td>
    <td>Punkty</td>
   </thead>
   <tbody>
    <tr *ngFor="let oneItem of history"> 
      <td>{{ oneItem.date | date: 'shortDate' }} </td>
      <td>{{ oneItem.type }} </td>
      <td>{{ oneItem.name }}</td>
      <td>{{ oneItem.points }}</td>
    </tr>
  </tbody>
  </table>



  `,
  styles: [],

})
export class PointsComponent implements OnInit {


  constructor(    
    private router: Router,
    private http: HttpClient,
    private route:ActivatedRoute,
  ) { }

  kid = {};
  userMissions
  userGifts
  unusedGifts
  availableGifts
  chosenGifts
  receivedGifts
  extraPoints

  ngOnInit(){
    this.kid['id']=this.route.parent.snapshot.paramMap.get('kidId');
    this.http.get('http://localhost:3000/kids/'+this.kid['id']+'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
      .subscribe( kid => {
        this.kid = kid;
        this.userMissions = this.kid['userMissions'];
        this.userGifts = this.kid['userGifts'];
        this.chosenGifts = this.userGifts.filter (x => x.status==='chosen');
        this.receivedGifts = this.userGifts.filter (x => x.status==='received'); 
        this.extraPoints = this.kid['extraPoints'];
        this.showHistory() ;
      })
  }
  
  history=[]

  showHistory(){
    for (let mission of this.userMissions){
      for (let doneDate of mission['doneDates']){
        let newItem={}
        newItem['type'] = 'mission'
        newItem['points'] = mission['points']
        newItem['date'] = doneDate
        newItem['name'] = mission['name']
        this.history.push(newItem)
      }
    }
    for (let gifts of this.chosenGifts){
      let newItem={}
      newItem['type'] = 'gifts'
      newItem['points'] = -1*gifts['points']
      newItem['date'] = gifts['chosenDate']
      newItem['name'] = gifts['name']
      this.history.push(newItem)    
    }
    for (let gifts of this.receivedGifts){
      let newItem={}
      newItem['type'] = 'gifts'
      newItem['points'] = -1*gifts['points']
      newItem['date'] = gifts['chosenDate']
      newItem['name'] = gifts['name']
      this.history.push(newItem)  
    }
    for (let points of this.extraPoints){
      let newItem={}
      newItem['type'] = 'ekstra punkty'
      newItem['points'] = points['points']
      newItem['date'] = points['date']
      newItem['name'] = points['description']
      this.history.push(newItem)  
    }

    this.history.sort(function(a,b){
      return a['date']-b['date'];
    })
  }
  

}
