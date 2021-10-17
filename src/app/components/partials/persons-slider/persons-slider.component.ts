import { AfterContentChecked, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Employee } from 'app/store/employee/Employee';
import { NguCarouselConfig } from '@ngu/carousel';
import { Breakpoints } from 'app/constants';

@Component({
  selector: 'app-persons-slider',
  templateUrl: './persons-slider.component.html',
  styleUrls: ['./persons-slider.component.scss']
})
export class PersonsSliderComponent implements AfterContentChecked {
  @Input() persons: Array<Employee>;
  @Input() isLoading: boolean;

  sliderOptions: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 2, lg: 3, xl: 4, all: 0 },
    gridBreakpoints: {
      sm: Breakpoints.sm_min,
      md: Breakpoints.lg_min,
      lg: Breakpoints.xl_min,
      xl: Breakpoints.xxl_min,
    },
    slide: 4,
    speed: 300,
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(private cdr: ChangeDetectorRef) {  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }
}
