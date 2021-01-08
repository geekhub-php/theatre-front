import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { HttpClientModule } from '@angular/common/http';
import { StripHtmlModule } from '../shared/pipes/strip-html/strip-html.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../shared/spinner/spinner.module';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [
        HttpClientModule,
        StripHtmlModule,
        RouterTestingModule,
        SpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
