import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';

import { NguCarouselConfig } from '@ngu/carousel';
import { GatewayService } from '../../../services/gateway.service';
import { Employee } from '../../../store/employee/Employee';

@Component({
  selector: 'app-actors-slider',
  templateUrl: './actors-slider.component.html',
  styleUrls: ['./actors-slider.component.scss']
})
export class ActorsSliderComponent implements OnInit, AfterContentChecked {
  randomEmployees: Array<Employee>;

  carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, all: 0 },
    gridBreakpoints: {
      sm: 1100,
      md: 1500,
      lg: 1800,
      xl: 2200,
    },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    loop: true,
    load: 2,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(
    private getway: GatewayService,
    private _cdr: ChangeDetectorRef

  ) { }

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getway.getRandomEmployees()
      .subscribe((data: any) => {
        this.randomEmployees = data.employees;
      });
  }
}
