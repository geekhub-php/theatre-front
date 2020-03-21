import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { HttpClientModule } from '@angular/common/http';
import { StripHtmlModule } from '../shared/pipes/strip-html/strip-html.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleComponent ],
      imports: [
        HttpClientModule,
        StripHtmlModule,
        RouterTestingModule,
        SpinnerModule,
        NgxJsonLdModule
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
