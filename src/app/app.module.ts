import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { HomePageModule } from './home-page/home-page.module';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule, NgbPaginationModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { PerformanceListComponent } from './performance-list/performance-list.component';
import { PerformanceComponent } from './performance/performance.component';

import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ArticleComponent } from './article/article.component';
import { PersonComponent } from './person/person.component';
import { NewsComponent } from './news/news.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';
import { StripHtmlModule } from './shared/pipes/strip-html/strip-html.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { ScheduleModule } from './schedule/schedule.module';
import { WidgetModule } from './widget/widget.module';
import { AboutMoreComponent } from './about/about-more/about-more.component';
import { DevTeamComponent } from './dev-team/dev-team.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { PersonRolesComponent } from './person-roles/person-roles.component';
import { DonateComponent } from './donate/donate.component';

@NgModule({
  declarations: [
    AppComponent,
    PerformanceListComponent,
    PerformanceComponent,
    AboutComponent,
    TeamComponent,
    ContactsComponent,
    ArticleComponent,
    PersonComponent,
    PersonRolesComponent,
    NewsComponent,
    HomePageComponent,
    BoardTrusteesComponent,
    AboutMoreComponent,
    DevTeamComponent,
    SeasonsComponent,
    DonateComponent,
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
    NgxGalleryModule,
    SpinnerModule,
    ScheduleModule,
    NgbPaginationModule,
    WidgetModule,
    NgbPaginationModule,
    NgbAccordionModule,
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

