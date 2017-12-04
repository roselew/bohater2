import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from "./app.routing";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { AppHeaderComponent } from './app-header.component';
import { StarSvgComponent } from './star-svg.component';

import { ParentComponent } from './parents/parent.component';
import { CreateKidComponent } from './parents/create-kid.component';
import { EditKidComponent } from './parents/edit-kid.component';
import { KidsComponent } from './parents/kids.component';
import { OneKidComponent } from './parents/one-kid.component';
import { ParentHeaderComponent } from './parents/parent-header.component';
import { ParentLoginComponent } from './parents/parent-login.component';
import { ParentRegisterComponent } from './parents/parent-register.component';
import { ShortcutKidComponent } from './parents/shortcut-kid.component';
import { ViewKidComponent } from './parents/view-kid.component';

import { MissionsComponent } from './missions/missions.component';
import { CreateMissionComponent } from './missions/create-mission.component';
import { MissionComponent } from './missions/mission.component';
import { NewMissionComponent } from './missions/new-mission.component';
import { ExpertMissionsComponent } from './missions/expert-missions.component';
import { ExpertMissionComponent } from './missions/expert-mission.component';
import { ViewMissionComponent } from './missions/view-mission.component';
import { MissionsToAcceptComponent } from './missions/missions-to-accept.component';

import { GiftsComponent } from './gifts/gifts.component';
import { AvailableGiftComponent } from './gifts/available-gift.component';
import { ChosenGiftComponent } from './gifts/chosen-gift.component';
import { GiftsToReceiveComponent } from './gifts/gifts-to-receive.component';
import { ViewGiftComponent } from './gifts/view-gift.component';
import { NewGiftComponent } from './gifts/new-gift.component';
import { CreateGiftComponent } from './gifts/create-gift.component';
import { ExpertGiftComponent } from './gifts/expert-gift.component';
import { GiftComponent } from './gifts/gift.component';
import { ExpertGiftsComponent } from './gifts/expert-gifts.component';

import { KidComponent } from './kids/kid.component';
import { KidHeroComponent } from './kids/kid-hero.component';
import { KidBadgeComponent } from './kids/kid-badge.component';
import { KidLoginComponent } from './kids/kid-login.component';
import { KidMenuComponent } from './kids/kid-menu.component';
import { KidMissionsComponent } from './kids/kid-missions.component';
import { KidGiftsComponent } from './kids/kid-gifts.component';
import { KidChoseGiftComponent } from './kids/kid-chose-gift.component';
import { KidOneDayComponent } from './kids/kid-one-day.component';
import { KidHeaderComponent } from './kids/kid-header.component';
import { KidProgressComponent } from './kids/kid-progress.component';

import { ExtraPointsComponent } from './points/extra-points.component';
import { PointsComponent } from './points/points.component';

import { OneDayViewComponent } from './progress/one-day-view.component';
import { OneWeekComponent } from './progress/one-week.component';
import { ProgressBarWeekComponent } from './progress/progress-bar-week.component';
import { ProgressHistoryComponent } from './progress/progress-history.component';
import { ProgressWeekComponent } from './progress/progress-week.component';

import { MissionsService } from './missions/missions.service';
import { ViewHeroComponent } from './parents/view-hero.component';
import { AuthParentService } from "./auth-parent.service";
import { AuthKidService } from "./auth-kid.service";



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AppHeaderComponent,
    StarSvgComponent,


    ParentComponent,
    CreateKidComponent,   
    EditKidComponent, 
    KidsComponent, 
    OneKidComponent,
    ParentHeaderComponent,    
    ParentLoginComponent,
    ParentRegisterComponent,
    ShortcutKidComponent,
    ViewKidComponent, 
    
    
    MissionsComponent,  
    CreateMissionComponent,
    MissionComponent,
    NewMissionComponent,
    ExpertMissionsComponent,
    ExpertMissionComponent,
    ViewMissionComponent,
    MissionsToAcceptComponent,   
    
    
    GiftsComponent,
    AvailableGiftComponent,
    ChosenGiftComponent,
    GiftsToReceiveComponent, 
    ViewGiftComponent,
    NewGiftComponent,
    CreateGiftComponent,
    ExpertGiftComponent,
    GiftComponent,
    ExpertGiftsComponent,
       
   
    KidComponent,
    KidHeroComponent,
    KidBadgeComponent,   
    KidLoginComponent,
    KidMenuComponent,
    KidMissionsComponent,
    KidGiftsComponent,
    KidChoseGiftComponent,  
    KidOneDayComponent,
    KidHeaderComponent, 
    KidProgressComponent,  
    
     
    ExtraPointsComponent,   
    PointsComponent,
    
    
    OneDayViewComponent,   
    OneWeekComponent,    
    ProgressBarWeekComponent,
    ProgressHistoryComponent,
    ProgressWeekComponent,
    ViewHeroComponent,
    
    
  ],
  
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule
  ],
  
  providers: [
    MissionsService,
    AuthParentService,
    AuthKidService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
