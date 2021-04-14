import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { NguCarouselConfig } from '@ngu/carousel';
import { GatewayService } from '../../../services/gateway.service';
import { Employee } from '../../../store/employee/Employee';

@Component({
  selector: 'app-actors-slider',
  templateUrl: './actors-slider.component.html',
  styleUrls: ['./actors-slider.component.scss']
})
export class ActorsSliderComponent implements OnInit, AfterViewInit {
  randomEmployees: Array<Employee>;
  imageArray: Array<string> = [];

  carouselTile: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
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

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  ngOnInit(): void {
    this.getway.getRandomEmployees()
      .subscribe((data: any) => {
        this.randomEmployees = data.employees;
        console.log(this.randomEmployees, 'data');
        this.randomEmployees.map(item => this.imageArray.push(item.avatar.employee_big.url));
        console.log(this.imageArray);
      });
  }
}
