import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from "./app.component";


import { WelcomeComponent } from './welcome.component';
import { ParentLoginComponent } from './parents/parent-login.component';
import { ParentRegisterComponent } from './parents/parent-register.component';
import { KidLoginComponent } from './kids/kid-login.component';


import { KidComponent } from './kids/kid.component';
import { KidMenuComponent } from './kids/kid-menu.component';
import { KidMissionsComponent } from './kids/kid-missions.component';
import { KidGiftsComponent } from './kids/kid-gifts.component';
import { KidChoseGiftComponent } from './kids/kid-chose-gift.component';
import { KidHeroComponent } from './kids/kid-hero.component';
import { KidBadgeComponent } from './kids/kid-badge.component';
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
import { AvailableGiftComponent } from './gifts/available-gift.component';
import { ChosenGiftComponent } from './gifts/chosen-gift.component';

import { ProgressComponent } from './progress/progress.component';
import { ProgressHistoryComponent } from './progress/progress-history.component';

import { PointsComponent } from './points/points.component';
import { ExtraPointsComponent } from './points/extra-points.component';


// const routes:Routes = [
//     { path: '',  redirectTo: '/parents', pathMatch:'full'             },
//     { path: 'kids',                                             component: KidsComponent}, 
//     { path: 'kids/:kidId',                                      component: KidComponent},
//     { path: 'kids/:kidId/edit-kid',                             component: EditKidComponent},

//     { path: 'kids/:kidId/missions',                             component: MissionsComponent},    
//     { path: 'kids/:kidId/missions/new-mission',                 component: NewMissionComponent},
//     { path: 'kids/:kidId/missions/create-mission',              component: CreateMissionComponent},
//     { path: 'kids/:kidId/missions/expert-mission/:missionId',   component: ExpertMissionComponent},
//     { path: 'kids/:kidId/missions/:missionId',                  component: MissionComponent},

//     { path: 'kids/:kidId/gifts',                                component: GiftsComponent},
//     { path: 'kids/:kidId/gifts/new-gift',                       component: NewGiftComponent},
//     { path: 'kids/:kidId/gifts/create-gift',                    component: CreateGiftComponent},
//     { path: 'kids/:kidId/gifts/expert-gift/:giftId',            component: ExpertGiftComponent},
//     { path: 'kids/:kidId/gifts/:giftId',                        component: GiftComponent},  
//     { path: 'kids/:kidId/gifts/available/:giftId',              component: AvailableGiftComponent},
//     { path: 'kids/:kidId/gifts/chosen/:giftId',                 component: ChosenGiftComponent},     

//     { path: 'parents',                                          component: ParentsComponent},
//     { path: 'parents/:parentId',                                component: ParentComponent},
//     { path: 'parents/:parentId/create-kid',                     component: CreateKidComponent},   

//     { path: 'kids/:kidId/one-day/:dayId',                       component: OneDayComponent},
//     { path: 'kids/:kidId/one-week/:weekId',                     component: OneWeekComponent},
//     { path: 'kids/:kidId/extra-points',                         component: ExtraPointsComponent},
//     { path: 'kids/:kidId/history',                              component: HistoryComponent}
// ]

const routes:Routes = [
    { path: '',                                          redirectTo: '/witaj', pathMatch:'full'},
    { path: 'witaj',                                     component: WelcomeComponent},
    { path: 'rodzic-logowanie',                          component: ParentLoginComponent},
    { path: 'rodzic-rejestracja',                        component: ParentRegisterComponent},  
    { path: 'dziecko-logowanie',                         component: KidLoginComponent},

//FOR KIDS ONLY 

    {path: 'dziecko',                                    component: KidComponent, children: [
        { path: '',                                      redirectTo: 'menu', pathMatch:'full'},
        { path: 'menu',                                  component: KidMenuComponent},
        { path: 'misje',                                 component: KidMissionsComponent},
        { path: 'nagrody',                               component: KidGiftsComponent},
        { path: 'nagrody/wybierz/:giftId',               component: KidChoseGiftComponent},
        { path: 'bohater',                               component: KidHeroComponent},
        { path: 'bohater/wybierz/:badgeId',              component: KidBadgeComponent},
        { path: 'odznaki',                               component: KidProgressComponent},
    ]},

// FOR PARENTS ONLY 

    { path: 'rodzic',                                    component: ParentComponent, children:[
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
            { path: 'nagrody/wybrane/:giftId',           component: ChosenGiftComponent},     

            { path: 'postepy/:weekId',                   component: ProgressComponent},
            { path: 'postepy/historia',                  component: ProgressHistoryComponent},

            { path: 'punkty',                            component: PointsComponent},
            { path: 'punkty/punkty-ekstra',              component: ExtraPointsComponent}
        ]},
    ]}

]
export const Routing = RouterModule.forRoot(routes,{
    useHash:false
})
