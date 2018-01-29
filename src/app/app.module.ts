import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from "./app.routing";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome.component';
import { AppHeaderComponent } from './app-header.component';
import { StarSvgComponent } from './star-svg.component';
import { AppAlertComponent } from './app-alert.component';

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
import { KidLoginComponent } from './kids/kid-login.component';
import { KidMenuComponent } from './kids/kid-menu.component';
import { KidMissionsComponent } from './kids/kid-missions.component';
import { KidGiftsComponent } from './kids/kid-gifts.component';
import { KidChoseGiftComponent } from './kids/kid-chose-gift.component';
import { KidOneDayComponent } from './kids/kid-one-day.component';
import { KidHeaderComponent } from './kids/kid-header.component';
import { KidProgressComponent } from './kids/kid-progress.component';
import { HeroProgressComponent } from './kids/hero-progress.component';

import { ExtraPointsComponent } from './points/extra-points.component';
import { PointsComponent } from './points/points.component';

import { OneDayViewComponent } from './progress/one-day-view.component';
import { OneWeekComponent } from './progress/one-week.component';
import { ProgressBarWeekComponent } from './progress/progress-bar-week.component';
import { ProgressHistoryComponent } from './progress/progress-history.component';
import { ProgressWeekComponent } from './progress/progress-week.component';
import { MoveMissionComponent } from './progress/move-mission.component';
import { ParentProgressComponent } from './progress/parent-progress.component';

import { MissionsService } from './services/missions.service';
import { GiftsService } from './services/gifts.service';
import { AuthParentService } from "./services/auth-parent.service";
import { AuthKidService } from "./services/auth-kid.service";
import { UsersService } from "./services/users.service";
import { ExpertsService } from "./services/experts.service";
import { CoreModule } from './core.module';
import { AppSpinnerComponent } from './app-spinner.component';

import { FamilyPanelComponent } from './parents/family-panel.component';
import { FamilyLoginComponent } from './parents/family-login.component';
import { FamilyComponent } from './parents/family.component';
import { AuthFamilyService } from './services/auth-family.service';
import { ParentEditComponent } from './parents/parent-edit.component';
import { ViewParentComponent } from './parents/view-parent.component';
import { FamilyMailchangeComponent } from './parents/family-mailchange.component';


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
    ParentEditComponent,
    ViewParentComponent,
    
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
    ParentProgressComponent,
    MoveMissionComponent,
    AppAlertComponent,
    AppSpinnerComponent,
    HeroProgressComponent,

    FamilyPanelComponent,
    FamilyLoginComponent,
    FamilyComponent,
    FamilyMailchangeComponent,
  ],
  
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  
  providers: [
    MissionsService,
    GiftsService,
    AuthParentService,
    AuthKidService,
    AuthFamilyService,
    UsersService,
    ExpertsService,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
