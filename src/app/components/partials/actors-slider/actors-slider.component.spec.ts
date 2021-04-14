import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsSliderComponent } from './actors-slider.component';

describe('SliderComponent', () => {
  let component: ActorsSliderComponent;
  let fixture: ComponentFixture<ActorsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
