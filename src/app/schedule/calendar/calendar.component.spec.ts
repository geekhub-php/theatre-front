import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';

import { HttpClientModule } from '@angular/common/http';
import { CalendarrModule } from '../calendarr.module';
import { CalendarDateFormatter, DateAdapter } from 'angular-calendar';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ HttpClientModule,
      CalendarrModule
      ],
      providers: [
        CalendarDateFormatter,
        DateAdapter
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
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
