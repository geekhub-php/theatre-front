import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { NewsComponent } from './news.component';
import { NewsListItemComponent } from '../partials/news-list-item/news-list-item.component';
import { SpinnerModule } from '../partials/spinner/spinner.module';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        NewsListItemComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SpinnerModule,
        NgbPaginationModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
