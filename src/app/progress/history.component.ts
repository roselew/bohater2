import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'history',
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

    <button routerLink="../">Powrót do dziecka </button>

  `,
  styles: [],
})
export class HistoryComponent implements OnInit {

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
      this.kid['id']=this.route.snapshot.paramMap.get('kidId');
      this.http.get('http://localhost:3000/kids/'+this.kid['id'])
        .subscribe( kid => this.kid = kid )
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userMissions')
        .subscribe( userMissions => {
          this.userMissions = userMissions;
          this.fetchGifts();   
         })
      }

  fetchGifts(){
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/userGifts')
        .subscribe( userGifts  => {
          this.userGifts = userGifts;
          this.chosenGifts = this.userGifts.filter (x => x.status==='chosen');
          this.receivedGifts = this.userGifts.filter (x => x.status==='received');  
          this.fetchExtraPoints();   
        })
   }

   fetchExtraPoints(){
      this.http.get('http://localhost:3000/kids/'+this.kid['id']+'/extraPoints')
        .subscribe( extraPoints => {
          this.extraPoints = extraPoints; 
          this.showHistory();
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
      // this.totalPoints += parseInt(points['points'])
    }

    this.history.sort(function(a,b){
      return a['date']-b['date'];
    })
  }
  
 

}
