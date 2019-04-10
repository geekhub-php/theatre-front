import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CalendarComponent } from './calendar.component';
import { CalendarModule, CalendarDateFormatter, DateAdapter } from 'angular-calendar';


describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [ HttpClientModule, CalendarModule ],
      providers: [
        { provide: DateAdapter, useValue: {} }
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
