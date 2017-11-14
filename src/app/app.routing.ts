import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from "./app.component";
import { KidsComponent } from "./kids/kids.component";
import { ParentsComponent } from "./parents.component";
import { KidComponent } from "./kids/kid.component";
import { CreateKidComponent } from "./kids/create-kid.component";
import { ParentComponent } from "./parent.component";
import { CreateMissionComponent } from "./missions/create-mission.component";
import { MissionComponent } from "./missions/mission.component";
import { NewMissionComponent } from "./missions/new-mission.component";
import { ExpertMissionComponent } from "./missions/expert-mission.component";
import { OneDayComponent } from './progress/one-day.component';
import { OneWeekComponent } from './progress/one-week.component';
import { NewGiftComponent } from './gifts/new-gift.component';
import { CreateGiftComponent } from './gifts/create-gift.component';
import { ExpertGiftComponent } from './gifts/expert-gift.component';
import { GiftComponent } from './gifts/gift.component';
import { GiftsComponent } from "./gifts/gifts.component";
import { MissionsComponent } from "./missions/missions.component";
import { EditKidComponent } from "./kids/edit-kid.component";
import { AvailableGiftComponent } from "./gifts/available-gift.component";
import { ChosenGiftComponent } from "./gifts/chosen-gift.component";


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
