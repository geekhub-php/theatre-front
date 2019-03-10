import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { PerformanceListComponent } from '../performance-list/performance-list.component';
import { PerformanceComponent } from '../performance/performance.component';
import { NewsListComponent } from '../news-list/news-list.component';
import { NewsComponent } from '../news/news.component';
import { AboutComponent } from '../about/about.component';
import { TeamListComponent } from '../team-list/team-list.component';
import { TeamComponent } from '../team/team.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AppComponent } from '../app.component';
import { APP_BASE_HREF } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterModule,
          AppRoutingModule,
          LazyLoadImageModule,
      ],
      declarations: [
          AppComponent,
          MainMenuComponent,
          HomePageComponent,
          ScheduleComponent,
          PerformanceListComponent,
          PerformanceComponent,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
