import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from "../services/users.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { ExpertsService } from '../services/experts.service';

@Component({
  selector: 'parent-card',
  template: `




  `,
  styles: [],
})
export class ParentCardComponent implements OnInit {

  constructor(
    public experts: ExpertsService,
    public afAuth: AngularFireAuth,
    public users: UsersService,
    private router: Router,
    private route:ActivatedRoute,
    private renderer: Renderer2) { 
      this.renderer.addClass(document.body,'title-page')
      this.renderer.addClass(document.body,'kid')
      this.renderer.removeClass(document.body,'parent')
    }

    heroImage

    ngOnInit(){
      this.heroImage = this.experts.getHeroImage(this.user['heroId'])
    }

    @Input() user 

}
