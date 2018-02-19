import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";


import { WelcomeComponent } from './welcome.component';
import { ParentLoginComponent } from './parents/parent-login.component';
import { ParentRegisterComponent } from './parents/parent-register.component';
import { KidLoginComponent } from './kids/kid-login.component';


import { KidComponent } from './kids/kid.component';
import { KidMenuComponent } from './kids/kid-menu.component';
import { KidMissionsComponent } from './kids/kid-missions.component';
import { KidGiftsComponent } from './kids/kid-gifts.component';
import { KidHeroComponent } from './kids/kid-hero.component';
import { KidProgressComponent } from './kids/kid-progress.component';

import { ParentComponent } from './parents/parent.component';
import { KidsComponent } from './parents/kids.component';
import { CreateKidComponent } from './parents/create-kid.component';
import { OneKidComponent } from './parents/one-kid.component';
import { EditKidComponent } from './parents/edit-kid.component';

import { MissionsComponent } from './missions/missions.component';
import { NewMissionComponent } from './missions/new-mission.component';
import { CreateMissionComponent } from './missions/create-mission.component';
import { ExpertMissionComponent } from './missions/expert-mission.component';
import { MissionComponent } from './missions/mission.component';

import { GiftsComponent } from './gifts/gifts.component';
import { NewGiftComponent } from './gifts/new-gift.component';
import { CreateGiftComponent } from './gifts/create-gift.component';
import { ExpertGiftComponent } from './gifts/expert-gift.component';
import { GiftComponent } from './gifts/gift.component';

import { ParentProgressComponent } from './progress/parent-progress.component';
import { ProgressHistoryComponent } from './progress/progress-history.component';

import { PointsComponent } from './points/points.component';
import { ExtraPointsComponent } from './points/extra-points.component';

import { AuthKidService } from "./services/auth-kid.service";
import { AuthParentService } from "./services/auth-parent.service";
import { AvailableGiftComponent } from "./gifts/available-gift.component";

import { FamilyPanelComponent } from './parents/family-panel.component';
import { FamilyLoginComponent } from './parents/family-login.component';
import { FamilyComponent } from './parents/family.component';
import { AuthFamilyService } from './services/auth-family.service';
import { ParentEditComponent } from './parents/parent-edit.component';
import { FamilyMailchangeComponent } from './parents/family-mailchange.component';




const routes:Routes = [
    { path: '',                                          redirectTo: '/witaj', pathMatch:'full'},
    { path: 'witaj',                                     component: WelcomeComponent},
    { path: 'rodzina-logowanie',                          component: FamilyLoginComponent},
    { path: 'rodzina-rejestracja',                        component: ParentRegisterComponent},  

    { path: 'rodzina', component: FamilyComponent, canActivate: [ AuthFamilyService ], children: [

        {path:'',                                       redirectTo: 'menu', pathMatch: 'full'},
        {path: 'menu',                                  component: FamilyPanelComponent},
        {path: 'edytuj',                                component: ParentEditComponent},
        {path: 'edytuj-email',                          component: FamilyMailchangeComponent},
        // FOR KIDS ONLY
        {path: 'dziecko-logowanie',                     component: KidLoginComponent},
        {path: 'dziecko/:kidId',    component: KidComponent, canActivate: [ AuthKidService ], children: [
            { path: '',                                     redirectTo: 'menu', pathMatch:'full'},
            { path: 'menu',                                 component: KidMenuComponent},
            { path: 'misje/:dayId',                         component: KidMissionsComponent},
            { path: 'nagrody',                              component: KidGiftsComponent},
            { path: 'bohater',                              component: KidHeroComponent},
            { path: 'postepy/historia',                     component: ProgressHistoryComponent},       
            { path: 'postepy/:weekId',                      component: KidProgressComponent},
        ]},

        // FOR PARENTS ONLY 
        {path: 'rodzic-logowanie',                     component: ParentLoginComponent},
        { path: 'rodzic',         component: ParentComponent, canActivate: [AuthParentService ], children:[
            { path: '',                                      redirectTo: 'dzieci', pathMatch:'full'},   
            { path: 'dzieci',                                component: KidsComponent}, 
            { path: 'dzieci/dodaj-dziecko',                  component: CreateKidComponent},    

            { path: 'dziecko/:kidId',                        component: OneKidComponent, children:[
                { path: '',                                  redirectTo: 'postepy/0', pathMatch: 'full'},
                { path: 'edytuj-dziecko',                    component: EditKidComponent},
    
                { path: 'misje',                             component: MissionsComponent},    
                { path: 'misje/dodaj',                       component: NewMissionComponent},
                { path: 'misje/dodaj-wlasna',                component: CreateMissionComponent},
                { path: 'misje/dodaj-polecana/:missionId',   component: ExpertMissionComponent},
                { path: 'misje/:missionId',                  component: MissionComponent},

                { path: 'nagrody',                           component: GiftsComponent},
                { path: 'nagrody/dodaj',                     component: NewGiftComponent},
                { path: 'nagrody/dodaj-wlasna',              component: CreateGiftComponent},
                { path: 'nagrody/dodaj-polecana/:giftId',    component: ExpertGiftComponent},
                { path: 'nagrody/:giftId',                   component: GiftComponent},  
                { path: 'nagrody/dostepne/:giftId',          component: AvailableGiftComponent},
    
                { path: 'postepy/historia',                  component: ProgressHistoryComponent},
                { path: 'postepy/:weekId',                   component: ParentProgressComponent},

                { path: 'punkty',                            component: PointsComponent},
                { path: 'punkty/punkty-ekstra',              component: ExtraPointsComponent}
            ]},
        ]},
    ]},

    { path: '**',                                        redirectTo: '/witaj', pathMatch:'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class Routing { }
