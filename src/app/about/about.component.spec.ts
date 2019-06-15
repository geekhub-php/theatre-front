import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { HttpClientModule } from '@angular/common/http';
import { StripHtmlModule } from '../shared/pipes/strip-html/strip-html.module';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../shared/spinner/spinner.module';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      imports: [HttpClientModule, StripHtmlModule, RouterTestingModule, SpinnerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
