import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'view-parent',
  template: `

      <div class="triple-radio">
        <input type="radio" [(ngModel)]="parent['gender']" value="tata" name="parent-name" id="parent-left"><label for="parent-left" class="triple">Tata</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="mama" name="parent-name" id="parent-center"><label for="parent-center" class="triple">Mama</label>
        <input type="radio" [(ngModel)]="parent['gender']" value="rodzic" name="parent-name" id="parent-right"><label for="parent-right" class="triple">Rodzic</label>
      </div>     


  `,
  styles: [``],

})
export class ViewParentComponent implements OnInit {

  constructor(){}


    @Input() codes 
    @Input() parent



  ngOnInit() { }
  


  }
  



