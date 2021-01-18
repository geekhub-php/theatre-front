import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsItemComponent } from './news-item.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsItem } from '../core/model/news/NewsItem';
import { NewsItemImage } from '../core/model/news/NewsItemImage';
import { Image } from '../core/model/Image';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { ImageProperties } from '../core/model/ImageProperties';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ],
      imports: [
        HttpClientModule,
        RouterModule,
        SpinnerModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;
    component.item = new NewsItem();
    component.item.mainPicture = new NewsItemImage();
    component.item.mainPicture.post_big = new Image();
    component.item.mainPicture.post_big.properties = new ImageProperties();
    component.item.mainPicture.post_big.properties.title = 'Hello World!';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
