import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NguCarouselModule } from '@ngu/carousel';

import { ActorsSliderComponent } from './actors-slider.component';

describe('PerformanceSliderComponent', () => {
  let component: ActorsSliderComponent;
  let fixture: ComponentFixture<ActorsSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorsSliderComponent ],
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        NguCarouselModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
