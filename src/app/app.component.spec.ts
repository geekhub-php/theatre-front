import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/main-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { PerformanceListComponent } from './performance-list/performance-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TeamComponent } from './team/team.component';
import { NewsListComponent } from './news-list/news-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { PerformanceComponent } from './performance/performance.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { APP_BASE_HREF } from '@angular/common';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        PerformanceListComponent,
        HomePageComponent,
        PerformanceComponent,
        ScheduleComponent,
        NewsListComponent,
        NewsComponent,
        AboutComponent,
        TeamListComponent,
        TeamComponent,
        ContactsComponent,
        PageNotFoundComponent
      ],
      providers: [
          {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
          AppRoutingModule,
          LazyLoadImageModule,
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
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').textContent).toContain('HOME');
  }));
});
