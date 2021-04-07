import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NewsListItemComponent } from './news-list-item.component';
import { NewsItem } from '../../../store/news/NewsItem';
import { NewsItemImage } from '../../../store/news/NewsItemImage';
import { Image } from '../../../store/Image';
import { ImageProperties } from '../../../store/ImageProperties';

describe('NewsItemComponent', () => {
  let component: NewsListItemComponent;
  let fixture: ComponentFixture<NewsListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListItemComponent ],
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListItemComponent);
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
