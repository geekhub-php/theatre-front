import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CalendarDateFormatter, CalendarUtils, DateAdapter } from 'angular-calendar';

import { CalendarComponent } from './calendar.component';
import { ScheduleModule } from '../schedule.module';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientModule,
        ScheduleModule
      ],
      providers: [
        CalendarDateFormatter,
        DateAdapter,
        CalendarUtils
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
