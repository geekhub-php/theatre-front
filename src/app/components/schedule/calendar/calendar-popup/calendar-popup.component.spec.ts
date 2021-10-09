import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarPopupComponent } from './calendar-popup.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CalendarPopupComponent', () => {
  let component: CalendarPopupComponent;
  let fixture: ComponentFixture<CalendarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarPopupComponent ], imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
