import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';

import { NgbCollapseModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { PerformanceComponent } from './components/performance/performance.component';

import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ArticleComponent } from './components/article/article.component';
import { PersonComponent } from './components/person/person.component';
import { NewsComponent } from './components/news/news.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BoardTrusteesComponent } from './components/board-trustees/board-trustees.component';
import { SpinnerModule } from './components/partials/spinner/spinner.module';
import { AboutMoreComponent } from './components/about/about-more/about-more.component';
import { FestivalsComponent } from './components/about/festivals/festivals.component';
import { TheatreHistoryComponent } from './components/about/theatre-history/theatre-history.component';
import { AboutHeaderComponent } from './components/about/about-header/about-header.component';
import { EpochComponent } from './components/about/epoch/epoch.component';
import { VisitComponent } from './components/about/visit/visit.component';
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { RolesComponent } from './components/person/roles/roles.component';
import { DonateComponent } from './components/donate/donate.component';
import { PersonsHeaderComponent } from './components/team/persons-header/persons-header.component';
import { PersonsShowMoreComponent } from './components/team/persone-show-more/persons-show-more.component';
import { PersonsSliderComponent } from './components/partials/persons-slider/persons-slider.component';
import { PersonCardComponent } from './components/team/person-card/person-card.component';

import { StripHtmlModule } from './pipes/strip-html.module';

import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalendarComponent } from './components/schedule/calendar/calendar.component';
import { ListViewComponent } from './components/schedule/list-view/list-view.component';
import { CalendarPopupComponent } from './components/schedule/calendar/calendar-popup/calendar-popup.component';
import { CalendarService } from './components/schedule/calendar.service';

import { SideMenuComponent } from './components/home-page/side-menu/side-menu.component';
import { PerformanceSliderComponent } from './components/home-page/performance-slider/performance-slider.component';
import { NewsListItemComponent } from './components/partials/news-list-item/news-list-item.component';
import { CooperationComponent } from './components/cooperation/cooperation.component';
import { SeasonsComponent } from './components/performance/seasons/seasons.component';

import { CoreModule } from './modules/core/core.module';
import { RepertoireNavHeaderComponent } from './components/repertoire/repertoire-nav-header/repertoire-nav-header.component';
import { CatInteractiveComponent } from './components/schedule/list-view/cat-interactive/cat-interactive.component';
import { playerFactory } from './components/partials/spinner/spinner.component';
import { GroupComponent } from './components/team/group/group.component';
import { MonthSelectComponent } from './components/schedule/month-select/month-select.component';

@NgModule({
  declarations: [
    AppComponent,
    RepertoireComponent,
    PerformanceComponent,
    AboutComponent,
    TeamComponent,
    ContactsComponent,
    ArticleComponent,
    PersonComponent,
    RolesComponent,
    NewsComponent,
    HomePageComponent,
    BoardTrusteesComponent,
    AboutMoreComponent,
    DevTeamComponent,
    ScheduleComponent,
    CalendarComponent,
    ListViewComponent,
    CalendarPopupComponent,
    DonateComponent,
    ScheduleComponent,
    SideMenuComponent,
    PerformanceSliderComponent,
    NewsListItemComponent,
    RepertoireNavHeaderComponent,
    CooperationComponent,
    PersonsHeaderComponent,
    GroupComponent,
    PersonsShowMoreComponent,
    SeasonsComponent,
    CatInteractiveComponent,
    FestivalsComponent,
    TheatreHistoryComponent,
    AboutHeaderComponent,
    EpochComponent,
    VisitComponent,
    PersonsSliderComponent,
    PersonCardComponent,
    MonthSelectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    StripHtmlModule,
    InfiniteScrollModule,
    NgxGalleryModule,
    NgbPaginationModule,
    NgbPaginationModule,
    NgbCollapseModule,
    SpinnerModule,
    CoreModule,
    NguCarouselModule,
    LottieModule.forRoot({ player: playerFactory }),
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [
    CalendarPopupComponent,
    CalendarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

