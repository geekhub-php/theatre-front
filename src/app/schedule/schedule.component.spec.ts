import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StripHtmlModule } from '../shared/pipes/strip-html/strip-html.module';

import localeUk from '@angular/common/locales/uk';
import localeUkExtra from '@angular/common/locales/extra/uk';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeUk, 'uk-UA', localeUkExtra);

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ],
      imports: [
        HttpClientModule,
        NgbModule,
        SpinnerModule,
        RouterTestingModule,
        StripHtmlModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
