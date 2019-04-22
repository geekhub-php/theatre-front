import { TestBed, async } from '@angular/core/testing';
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
import { PartnersComponent } from './partners/partners.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';
import { StripHtmlModule } from './shared/pipes/strip-html/strip-html.module';
import { CoreModule } from './core/core.module';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { AboutMoreComponent } from './about/about-more/about-more.component';
import { DevTeamComponent } from './dev-team/dev-team.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        ArticleComponent,
        TeamComponent,
        ContactsComponent,
        PartnersComponent,
        BoardTrusteesComponent,
        AboutMoreComponent,
        DevTeamComponent
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
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
