import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreHistoryComponent } from './theatre-history.component';

describe('FestivalsComponent', () => {
  let component: TheatreHistoryComponent;
  let fixture: ComponentFixture<TheatreHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheatreHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatreHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
