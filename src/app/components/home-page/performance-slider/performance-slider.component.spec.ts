import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { GalleryModule } from 'ng-gallery';

import { PerformanceSliderComponent } from './performance-slider.component';

describe('PerformanceSliderComponent', () => {
  let component: PerformanceSliderComponent;
  let fixture: ComponentFixture<PerformanceSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceSliderComponent ],
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        GalleryModule,
      ]
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
