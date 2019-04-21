import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';
import { ActivatedRoute } from '@angular/router';
import { Image } from '../core/model/Image';
import { Role } from '../core/model/Role';
import { LoaderService } from '../shared/spinner/loader.service';


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
    private router: ActivatedRoute,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');
    this.getPerformanceBySlug(slug);
    this.getRoles();
  }

  getPerformanceBySlug(slug: string) {
    let temp;
    this.gateway.getPerformanceBySlug(slug).subscribe((res) => {
      this.performance = res.body;
      this.loaderService.stop('performance-page');
      temp = this.performance.gallery;
      if (temp) {
        this.getSliderImages(temp, this.images);
      }
    }, err => this.loaderService.stop('performance-page'));
    this.loaderService.start('performance-page');
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
