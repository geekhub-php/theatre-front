import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../../partials/spinner/spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StripHtmlModule } from '../../../pipes/strip-html.module';

import localeUk from '@angular/common/locales/uk';
import localeUkExtra from '@angular/common/locales/extra/uk';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeUk, 'uk-UA', localeUkExtra);

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
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
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
