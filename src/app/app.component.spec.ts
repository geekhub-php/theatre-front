import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PerformanceListComponent } from './performance-list/performance-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TeamComponent } from './team/team.component';
import { PersonComponent } from './person/person.component';
import { PerformanceComponent } from './performance/performance.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { APP_BASE_HREF } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { HomePageModule } from './home-page/home-page.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DonateComponent } from './donate/donate.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';
import { StripHtmlModule } from './shared/pipes/strip-html/strip-html.module';
import { CoreModule } from './core/core.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { AboutMoreComponent } from './about/about-more/about-more.component';
import { DevTeamComponent } from './dev-team/dev-team.component';
import { WidgetModule } from './widget/widget.module';
import { SeasonsComponent } from './seasons/seasons.component';
import { PersonRolesComponent } from './person-roles/person-roles.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PerformanceListComponent,
        HomePageComponent,
        PerformanceComponent,
        ScheduleComponent,
        NewsComponent,
        AboutComponent,
        PersonComponent,
        PersonRolesComponent,
        ArticleComponent,
        TeamComponent,
        ContactsComponent,
        DonateComponent,
        BoardTrusteesComponent,
        AboutMoreComponent,
        DevTeamComponent,
        SeasonsComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        NgbModule,
        AppRoutingModule,
        CoreModule,
        HomePageModule,
        RouterTestingModule,
        StripHtmlModule,
        InfiniteScrollModule,
        NgxGalleryModule,
        SpinnerModule,
        NgbPaginationModule,
        WidgetModule
      ]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
