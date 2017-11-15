import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from "./app.routing";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { KidsComponent } from './kids/kids.component';
import { ParentsComponent } from './parents/parents.component';
import { KidComponent } from './kids/kid.component';
import { CreateKidComponent } from './kids/create-kid.component';
import { ParentComponent } from './parents/parent.component';
import { CreateMissionComponent } from './missions/create-mission.component';
import { MissionComponent } from './missions/mission.component';
import { NewMissionComponent } from './missions/new-mission.component';
import { ExpertMissionsComponent } from './missions/expert-missions.component';
import { ExpertMissionComponent } from './missions/expert-mission.component';
import { ProgressComponent } from './progress/progress.component';
import { OneDayComponent } from './progress/one-day.component';
import { OneWeekComponent } from './progress/one-week.component';
import { OneDayViewComponent } from './progress/one-day-view.component';

import { NewGiftComponent } from './gifts/new-gift.component';
import { CreateGiftComponent } from './gifts/create-gift.component';
import { ExpertGiftComponent } from './gifts/expert-gift.component';
import { GiftComponent } from './gifts/gift.component';
import { ExpertGiftsComponent } from './gifts/expert-gifts.component';
import { MissionsToAcceptComponent } from './missions/missions-to-accept.component';
import { ProgressWeekComponent } from './progress/progress-week.component';
import { ShortcutKidComponent } from './kids/shortcut-kid.component';
import { GiftsComponent } from './gifts/gifts.component';
import { MissionsComponent } from './missions/missions.component';
import { EditKidComponent } from './kids/edit-kid.component';

import { MyHeaderComponent } from './kids/my-header.component';

import { ViewKidComponent } from './kids/view-kid.component';
import { ViewMissionComponent } from './missions/view-mission.component';
import { ViewGiftComponent } from './gifts/view-gift.component';
import { AvailableGiftComponent } from './gifts/available-gift.component';
import { ChosenGiftComponent } from './gifts/chosen-gift.component';
import { GiftsToReceiveComponent } from './gifts/gifts-to-receive.component';


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
    ProgressComponent,
    OneDayComponent,
    OneWeekComponent,
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
    GiftsToReceiveComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
