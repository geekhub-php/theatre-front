import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from '../widget/widget.module';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsComponent,
        NewsItemComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SpinnerModule,
        NgbPaginationModule,
        WidgetModule
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
