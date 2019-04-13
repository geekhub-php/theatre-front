import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { HomePageModule } from './home-page/home-page.module';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { PerformanceListComponent } from './performance-list/performance-list.component';
import { PerformanceComponent } from './performance/performance.component';

import { ScheduleComponent } from './schedule/schedule.component';

import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ArticleComponent } from './article/article.component';
import { PersonComponent } from './person/person.component';
import { NewsComponent } from './news/news.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PartnersComponent } from './partners/partners.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';
import { StripHtmlModule } from './shared/pipes/strip-html/strip-html.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { StripNbspPipe } from './shared/pipes/strip-nbsp/strip-nbsp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceListComponent,
    PerformanceComponent,
    ScheduleComponent,
    AboutComponent,
    TeamComponent,
    ContactsComponent,
    ArticleComponent,
    PersonComponent,
    NewsComponent,
    HomePageComponent,
    PartnersComponent,
    BoardTrusteesComponent,
    StripNbspPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    HomePageModule,
    NgbModule,
    StripHtmlModule,
    InfiniteScrollModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

