import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthsCarouselComponent } from './months-carousel.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonthsCarouselComponent', () => {
  let component: MonthsCarouselComponent;
  let fixture: ComponentFixture<MonthsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthsCarouselComponent ], imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
