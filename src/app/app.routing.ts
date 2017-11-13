import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from "./app.component";
import { KidsComponent } from "./kids.component";
import { ParentsComponent } from "./parents.component";
import { KidComponent } from "./kid.component";
import { CreateKidComponent } from "./create-kid.component";
import { ParentComponent } from "./parent.component";
import { CreateMissionComponent } from "./create-mission.component";
import { MissionComponent } from "./mission.component";
import { NewMissionComponent } from "./new-mission.component";
import { ExpertMissionComponent } from "./expert-mission.component";
import { OneDayComponent } from './one-day.component';
import { OneWeekComponent } from './one-week.component';
import { NewGiftComponent } from './new-gift.component';
import { CreateGiftComponent } from './create-gift.component';
import { ExpertGiftComponent } from './expert-gift.component';
import { GiftComponent } from './gift.component';


const routes:Routes = [
    { path: '',                                         component: ParentsComponent},
    { path: 'kids',                                     component: KidsComponent}, 
    { path: 'kids/:kidId',                              component: KidComponent},
    { path: 'kids/:kidId/new-mission',                  component: NewMissionComponent},
    { path: 'kids/:kidId/create-mission',               component: CreateMissionComponent},
    { path: 'kids/:kidId/expert-mission/:missionId',    component: ExpertMissionComponent},
    { path: 'kids/:kidId/mission/:missionId',           component: MissionComponent},
    { path: 'kids/:kidId/new-gift',                     component: NewGiftComponent},
    { path: 'kids/:kidId/create-gift',                  component: CreateGiftComponent},
    { path: 'kids/:kidId/expert-gift/:giftId',          component: ExpertGiftComponent},
    { path: 'kids/:kidId/gift/:giftId',                 component: GiftComponent},    
    { path: 'parents',                                  component: ParentsComponent},
    { path: 'parents/:parentId',                        component: ParentComponent},
    { path: 'parents/:parentId/create-kid',             component: CreateKidComponent},    
    { path: 'kids/:kidId/one-day/:dayId',               component: OneDayComponent},
    { path: 'kids/:kidId/one-week/:weekId',             component: OneWeekComponent}
]

export const Routing = RouterModule.forRoot(routes,{
    useHash:false
})
