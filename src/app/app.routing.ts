import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from "./app.component";
import { KidsComponent } from "./kids.component";
import { ParentsComponent } from "./parents.component";
import { KidComponent } from "./kid.component";
import { CreateKidComponent } from "./create-kid.component";
import { ParentComponent } from "./parent.component";
import { CreateMissionComponent } from "./missions/create-mission.component";
import { MissionComponent } from "./missions/mission.component";
import { NewMissionComponent } from "./missions/new-mission.component";
import { ExpertMissionComponent } from "./missions/expert-mission.component";
import { OneDayComponent } from './one-day.component';
import { OneWeekComponent } from './one-week.component';
import { NewGiftComponent } from './new-gift.component';
import { CreateGiftComponent } from './create-gift.component';
import { ExpertGiftComponent } from './expert-gift.component';
import { GiftComponent } from './gift.component';
import { GiftsComponent } from "./gifts.component";
import { MissionsComponent } from "./missions/missions.component";
import { EditKidComponent } from "./edit-kid.component";
import { AvailableGiftComponent } from "./available-gift.component";
import { ChosenGiftComponent } from "./chosen-gift.component";


const routes:Routes = [
    { path: '',  redirectTo: '/parents', pathMatch:'full'             },
    { path: 'kids',                                             component: KidsComponent}, 
    { path: 'kids/:kidId',                                      component: KidComponent},
    { path: 'kids/:kidId/edit-kid',                             component: EditKidComponent},

    { path: 'kids/:kidId/missions',                             component: MissionsComponent},    
    { path: 'kids/:kidId/missions/new-mission',                 component: NewMissionComponent},
    { path: 'kids/:kidId/missions/create-mission',              component: CreateMissionComponent},
    { path: 'kids/:kidId/missions/expert-mission/:missionId',   component: ExpertMissionComponent},
    { path: 'kids/:kidId/missions/:missionId',                  component: MissionComponent},

    { path: 'kids/:kidId/gifts',                                component: GiftsComponent},
    { path: 'kids/:kidId/gifts/new-gift',                       component: NewGiftComponent},
    { path: 'kids/:kidId/gifts/create-gift',                    component: CreateGiftComponent},
    { path: 'kids/:kidId/gifts/expert-gift/:giftId',            component: ExpertGiftComponent},
    { path: 'kids/:kidId/gifts/:giftId',                        component: GiftComponent},  
    { path: 'kids/:kidId/gifts/available/:giftId',              component: AvailableGiftComponent},
    { path: 'kids/:kidId/gifts/chosen/:giftId',                 component: ChosenGiftComponent},     

    { path: 'parents',                                          component: ParentsComponent},
    { path: 'parents/:parentId',                                component: ParentComponent},
    { path: 'parents/:parentId/create-kid',                     component: CreateKidComponent},   

    { path: 'kids/:kidId/one-day/:dayId',                       component: OneDayComponent},
    { path: 'kids/:kidId/one-week/:weekId',                     component: OneWeekComponent}
]

export const Routing = RouterModule.forRoot(routes,{
    useHash:false
})
