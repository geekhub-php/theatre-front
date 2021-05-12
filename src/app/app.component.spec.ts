import { TestBed, waitForAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { TeamComponent } from './components/team/team.component';
import { PersonComponent } from './components/person/person.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ArticleComponent } from './components/article/article.component';
import { DonateComponent } from './components/donate/donate.component';
import { BoardTrusteesComponent } from './components/board-trustees/board-trustees.component';
import { StripHtmlModule } from './pipes/strip-html.module';
import { CoreModule } from './modules/core/core.module';
import { SpinnerModule } from './components/partials/spinner/spinner.module';
import { AboutMoreComponent } from './components/about/about-more/about-more.component';
import { DevTeamComponent } from './components/dev-team/dev-team.component';
import { RolesComponent } from './components/person/roles/roles.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RepertoireComponent,
        HomePageComponent,
        PerformanceComponent,
        ScheduleComponent,
        NewsComponent,
        AboutComponent,
        PersonComponent,
        RolesComponent,
        ArticleComponent,
        TeamComponent,
        ContactsComponent,
        DonateComponent,
        BoardTrusteesComponent,
        AboutMoreComponent,
        DevTeamComponent,
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        NgbModule,
        AppRoutingModule,
        CoreModule,
        HttpClientTestingModule,
        RouterTestingModule,
        StripHtmlModule,
        InfiniteScrollModule,
        NgxGalleryModule,
        SpinnerModule,
        NgbPaginationModule,
      ]
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
