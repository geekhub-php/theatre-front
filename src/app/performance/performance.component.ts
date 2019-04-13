import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../core/model/Image';
import { Employee } from '../core/model/Employee';
import { Role } from '../core/model/Role';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;
  performance: Performance;
  slug: string;
  roles: Array<Role>;
  images: Array<Image> = [];

  /**/
  constructor(
    private gateway: GatewayService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.getPerformanceBySlug(slug);
    this.getRoles();
  }


  getPerformanceBySlug(slug: string) {
    let temp;
    this.gateway.getPerformanceBySlug(slug).subscribe((res) => {
      this.performance = res.body;
      temp = this.performance.gallery;
      if (temp) {
        this.getSliderImages(temp, this.images);
      }
    });
  }

  getRoles() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateway.getRoles(slug).subscribe((res) => {
      this.roles = res;
    });
  }

  getSliderImages(items, out) {
    for (let i = 0; i < items.length; i++) {
      out[i] = items[i].images.performance_big;
    }
  }
}
