import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbCollapseModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { GoogleAnalyticsService, NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { GalleryModule } from 'ng-gallery';

import { CoreModule } from './modules/core/core.module';

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
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { RolesComponent } from './components/person/roles/roles.component';
import { DonateComponent } from './components/donate/donate.component';

import { StripHtmlModule } from './pipes/strip-html.module';

import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalendarComponent } from './components/schedule/calendar/calendar.component';
import { ListViewComponent } from './components/schedule/list-view/list-view.component';
import { MobileViewComponent } from './components/schedule/mobile-view/mobile-view.component';
import { CalendarService } from './components/schedule/calendar.service';

import { SideMenuComponent } from './components/home-page/side-menu/side-menu.component';
import { PerformanceSliderComponent } from './components/home-page/performance-slider/performance-slider.component';
import { NewsListItemComponent } from './components/partials/news-list-item/news-list-item.component';

import { environment } from '../environments/environment';

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
    ScheduleComponent, CalendarComponent, ListViewComponent, MobileViewComponent,
    DonateComponent,
    ScheduleComponent,
    SideMenuComponent,
    PerformanceSliderComponent,
    NewsListItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule,
    CoreModule,
    SpinnerModule,
    GalleryModule
  ],
  providers: [
    CalendarService,
    GoogleAnalyticsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

