import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routing } from "./app.routing";
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { KidsComponent } from './kids.component';
import { ParentsComponent } from './parents.component';
import { KidComponent } from './kid.component';
import { CreateKidComponent } from './create-kid.component';
import { ParentComponent } from './parent.component';
import { CreateMissionComponent } from './missions/create-mission.component';
import { MissionComponent } from './missions/mission.component';
import { NewMissionComponent } from './missions/new-mission.component';
import { ExpertMissionsComponent } from './missions/expert-missions.component';
import { ExpertMissionComponent } from './missions/expert-mission.component';
import { ProgressComponent } from './progress.component';
import { OneDayComponent } from './one-day.component';
import { OneWeekComponent } from './one-week.component';
import { OneDayViewComponent } from './one-day-view.component';

import { NewGiftComponent } from './new-gift.component';
import { CreateGiftComponent } from './create-gift.component';
import { ExpertGiftComponent } from './expert-gift.component';
import { GiftComponent } from './gift.component';
import { ExpertGiftsComponent } from './expert-gifts.component';
import { MissionsToAcceptComponent } from './missions/missions-to-accept.component';
import { ProgressWeekComponent } from './progress-week.component';
import { ShortcutKidComponent } from './shortcut-kid.component';
import { GiftsComponent } from './gifts.component';
import { MissionsComponent } from './missions/missions.component';
import { EditKidComponent } from './edit-kid.component';

import { MyHeaderComponent } from './my-header.component';

import { ViewKidComponent } from './view-kid.component';
import { ViewMissionComponent } from './missions/view-mission.component';
import { ViewGiftComponent } from './view-gift.component';
import { AvailableGiftComponent } from './available-gift.component';
import { ChosenGiftComponent } from './chosen-gift.component';


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
    ChosenGiftComponent
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
