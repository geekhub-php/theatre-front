import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;
  perfomance;
  roles;
  slug = 'dorogha-do-sontsia';

  /*  this.gallery.reference.url   тут же и альт для изображения   */

  images = ['http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg',
    'http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg'];

  /**/

  constructor(private gateway: GatewayService) {
  }

  ngOnInit() {
    this.gateway.getPerformanceBySlug(this.slug + '.json').subscribe((res) => {
      this.perfomance = res;
      console.dir(this.perfomance);
    });

    this.gateway.getRoles(this.slug + '/roles.json').subscribe((res) => {
      this.roles = res;
      console.dir(this.roles);
    });
  }

}

