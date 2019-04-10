import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarDateFormatter, DateAdapter } from 'angular-calendar';

import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from './schedule.component';
import { ScheduleModule } from './schedule.module';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ],
      providers: [
        CalendarDateFormatter,
        DateAdapter
      ],
      imports: [
        HttpClientModule,
        ScheduleModule
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
