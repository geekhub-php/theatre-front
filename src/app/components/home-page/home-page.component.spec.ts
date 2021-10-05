import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePageComponent } from './home-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PerformanceSliderComponent } from './performance-slider/performance-slider.component';
import { NewsListItemComponent } from '../partials/news-list-item/news-list-item.component';
import { SpinnerModule } from '../partials/spinner/spinner.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent,
        SideMenuComponent,
        PerformanceSliderComponent,
        NewsListItemComponent
      ],
      imports: [
        SpinnerModule,
        HttpClientModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
