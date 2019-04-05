import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSliderComponent } from './performance-slider.component';

describe('PerformanceSliderComponent', () => {
  let component: PerformanceSliderComponent;
  let fixture: ComponentFixture<PerformanceSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
