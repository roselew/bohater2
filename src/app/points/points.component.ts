import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'points',
  template: `
  <table> 
     <colgroup>
        <col style="width:25%">
        <col style="width:15%">
        <col style="width:40%">
        <col style="width:20%">
      </colgroup>  
  <thead>
    <th>Data</th>
    <th>Typ</th>
    <th>Nazwa</th>
    <th>Punkty</th>
   </thead>
   <tbody>
    <tr *ngFor="let oneItem of history"> 
      <td>{{ oneItem.date | date: 'shortDate' }} </td>
      <td>
        <img *ngIf="(oneItem.type=='mission')" src="assets/mission.svg" height='50px'>
        <img *ngIf="(oneItem.type=='gifts')" src="assets/gift.svg" height='50px'>
        <img *ngIf="(oneItem.type=='ekstra punkty')" src="assets/addstars.svg" height='50px'>
      </td>
      <td>{{ oneItem.name }}</td>
      <td>{{ oneItem.points }}</td>
    </tr>
  </tbody>
  </table>

  <div class="plus" routerLink="punkty-ekstra">+</div>

  `,
  styles: [`
  table{
    width:80%;
    margin-left:10%;
  }
  th, td {
      padding: 1.0rem;
      border-bottom: 2px dotted #ddd;
  }
  tr:hover {background-color: #f5f5f5;}
  `],

})
export class PointsComponent implements OnInit {


  constructor(    
    @Inject('API_URL') private API_URL,
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
    let kidId = +this.route.parent.snapshot.paramMap.get('kidId');
    this.http.get(this.API_URL+ 'kids/'+ kidId +'?_embed=userMissions&_embed=userGifts&_embed=extraPoints')
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
