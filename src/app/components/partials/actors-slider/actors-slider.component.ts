import { Component, AfterContentChecked, ChangeDetectorRef, Input } from '@angular/core';

import { NguCarouselConfig } from '@ngu/carousel';

import { Breakpoints } from '../../../constants';
import { Employee } from '../../../store/employee/Employee';
import { GatewayService } from '../../../services/gateway.service';


@Component({
  selector: 'app-actors-slider',
  templateUrl: './actors-slider.component.html',
  styleUrls: ['./actors-slider.component.scss']
})
export class ActorsSliderComponent implements AfterContentChecked {
  @Input() randomEmployees: Array<Employee>;

  carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 2, lg: 3, xl: 4, all: 0 },
    gridBreakpoints: {
      sm: Breakpoints.sm_min,
      md: Breakpoints.lg_min,
      lg: Breakpoints.xl_min,
      xl: Breakpoints.xxl_min,
    },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    loop: true,
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(
    private getway: GatewayService,
    private _cdr: ChangeDetectorRef

  ) { }

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
  }

}
