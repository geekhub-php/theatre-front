import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;
  performance: Performance;
  slug: string;
  employees;
  sliderImg;
  images = [];

  /**/
  constructor(
    private gateway: GatewayService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getPerformanceBySlug();
    this.getRoles();
  }


  getPerformanceBySlug() {
    const slug = this.router.snapshot.paramMap.get('slug');
    let temp;
    this.gateway.getPerformanceBySlug(slug).subscribe((res) => {
      this.performance = res.body;
      temp = this.performance.gallery;
      this.getSliderImages(temp, this.images);
    });
  }

  getRoles() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateway.getRoles(slug).subscribe((res) => {
      this.employees = res;
    });
  }

  getSliderImages(items, out) {
    for (let i = 0; i < items.length; i++) {
      out[i] = items[i].images.performance_big.url;
    }
  }

}
