import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalPopupComponent } from './cal-popup.component';

describe('CalPopupComponent', () => {
  let component: CalPopupComponent;
  let fixture: ComponentFixture<CalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
