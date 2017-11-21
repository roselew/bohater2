import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from "./app.routing";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { KidsComponent } from './parents/kids.component';
import { ParentsComponent } from './parents/parents.component';
import { KidComponent } from './kids/kid.component';
import { CreateKidComponent } from './parents/create-kid.component';
import { ParentComponent } from './parents/parent.component';
import { CreateMissionComponent } from './missions/create-mission.component';
import { MissionComponent } from './missions/mission.component';
import { NewMissionComponent } from './missions/new-mission.component';
import { ExpertMissionsComponent } from './missions/expert-missions.component';
import { ExpertMissionComponent } from './missions/expert-mission.component';
import { OneWeekComponent } from './progress/one-week.component';
import { KidOneDayComponent } from './kids/kid-one-day.component';

import { OneDayViewComponent } from './progress/one-day-view.component';

import { NewGiftComponent } from './gifts/new-gift.component';
import { CreateGiftComponent } from './gifts/create-gift.component';
import { ExpertGiftComponent } from './gifts/expert-gift.component';
import { GiftComponent } from './gifts/gift.component';
import { ExpertGiftsComponent } from './gifts/expert-gifts.component';
import { MissionsToAcceptComponent } from './missions/missions-to-accept.component';
import { ProgressWeekComponent } from './progress/progress-week.component';
import { ShortcutKidComponent } from './parents/shortcut-kid.component';
import { GiftsComponent } from './gifts/gifts.component';
import { MissionsComponent } from './missions/missions.component';
import { EditKidComponent } from './parents/edit-kid.component';

import { MyHeaderComponent } from './kids/my-header.component';

import { ViewKidComponent } from './parents/view-kid.component';
import { ViewMissionComponent } from './missions/view-mission.component';
import { ViewGiftComponent } from './gifts/view-gift.component';
import { AvailableGiftComponent } from './gifts/available-gift.component';
import { ChosenGiftComponent } from './gifts/chosen-gift.component';
import { GiftsToReceiveComponent } from './gifts/gifts-to-receive.component';
import { ExtraPointsComponent } from './points/extra-points.component';
import { WelcomeComponent } from './welcome.component';
import { ParentLoginComponent } from './parents/parent-login.component';
import { ParentRegisterComponent } from './parents/parent-register.component';
import { KidLoginComponent } from './kids/kid-login.component';
import { KidMenuComponent } from './kids/kid-menu.component';
import { KidMissionsComponent } from './kids/kid-missions.component';
import { KidGiftsComponent } from './kids/kid-gifts.component';
import { KidChoseGiftComponent } from './kids/kid-chose-gift.component';
import { KidHeroComponent } from './kids/kid-hero.component';
import { KidBadgeComponent } from './kids/kid-badge.component';
import { KidProgressComponent } from './kids/kid-progress.component';
import { OneKidComponent } from './parents/one-kid.component';
import { ProgressHistoryComponent } from './progress/progress-history.component';
import { PointsComponent } from './points/points.component';
import { KidOneDayViewComponent } from './kids/kid-one-day-view.component';
import { MissionsService } from './missions/missions.service';
import { KidHeaderComponent } from './kids/kid-header.component';
import { StarSvgComponent } from './star-svg.component';
import { KidOneDayView2Component } from './kids/kid-one-day-view2.component';


@NgModule({
  declarations: [
    AppComponent,
    KidsComponent,
    ParentsComponent,
    KidComponent,
    CreateKidComponent,
    ParentComponent,
    CreateMissionComponent,
    MissionComponent,
    NewMissionComponent,
    ExpertMissionsComponent,
    ExpertMissionComponent,
    OneWeekComponent,
    KidOneDayComponent,
    OneDayViewComponent,
    NewGiftComponent,
    CreateGiftComponent,
    ExpertGiftComponent,
    GiftComponent,
    ExpertGiftsComponent,
    MissionsToAcceptComponent,
    ProgressWeekComponent,
    ShortcutKidComponent,
    GiftsComponent,
    MissionsComponent,
    EditKidComponent,
    MyHeaderComponent,
    ViewKidComponent,
    ViewMissionComponent,
    ViewGiftComponent,
    AvailableGiftComponent,
    ChosenGiftComponent,
    GiftsToReceiveComponent,
    ExtraPointsComponent,
    WelcomeComponent,
    ParentLoginComponent,
    ParentRegisterComponent,
    KidLoginComponent,
    KidMenuComponent,
    KidMissionsComponent,
    KidGiftsComponent,
    KidChoseGiftComponent,
    KidHeroComponent,
    KidBadgeComponent,
    KidProgressComponent,
    OneKidComponent,
    ProgressHistoryComponent,
    PointsComponent,
    KidOneDayViewComponent,
    KidHeaderComponent,
    StarSvgComponent,
    KidOneDayView2Component
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MissionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
