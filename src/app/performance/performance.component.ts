import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';
import { PerformanceListResponse } from '../core/model/PerformanceListResponse';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;

  listPerfomance: Array<Performance>;
  // roles: Array<>

  /*  this.gallery.reference.url   тут же и альт для изображения   */
  images = ['http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg',
    'http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg'];

  /**/
  constructor(private getway: GatewayService) {
  }

  ngOnInit() {
    this.getway.getPerformanceSlug().subscribe((res: PerformanceListResponse) => {
      this.listPerfomance = res;
      console.dir(this.listPerfomance);
    });
    //  без модели ни куда
    // this.getway.getPerformanceRoles().subscribe((res: PerformanceListResponse) => {
    //   this.roles = res;
    //   console.dir(this.roles);
    // });

  }
}
