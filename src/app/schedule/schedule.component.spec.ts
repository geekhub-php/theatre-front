import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from './schedule.component';
import { CalendarrModule } from './calendarr.module';
import { CalendarDateFormatter, DateAdapter } from 'angular-calendar';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleComponent ],
      providers: [
        CalendarDateFormatter,
        DateAdapter
      ],
      imports: [
        HttpClientModule,
        CalendarrModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
