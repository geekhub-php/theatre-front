import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { LoaderService } from '../partials/spinner/loader.service';

import { GatewayService } from '../../services/gateway.service';
import { Performance } from '../../store/performance/Performance';
import { Role } from '../../store/Role';
import { NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder } from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performance: Performance;
  slug: string;
  roles: Array<Role>;
  activeId: string;
  galleryImages: Array<NgxGalleryImage> = [];
  galleryOptions: Array<NgxGalleryOptions> = [
    {
      image: false,
      width: '100%',
      thumbnailsColumns: 4,
      thumbnailsRows: 1,
      thumbnailMargin: 30,
      thumbnailSize: NgxGalleryImageSize.Cover,
      previewCloseOnEsc: true,
      previewAnimation: false,
      previewFullscreen: true,
      previewBullets: true,
      thumbnailsOrder: NgxGalleryOrder.Page,
      arrowPrevIcon: 'fa fa-chevron-left',
      arrowNextIcon: 'fa fa-chevron-right',
    },
  ];

  constructor(private gateway: GatewayService,
              private router: ActivatedRoute,
              private loaderService: LoaderService) {
    this.activeId = 'actors';
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');

    forkJoin([
      this.gateway.getPerformanceBySlug(slug),
      this.gateway.getPerformanceRoles(slug)
    ]).subscribe(([performance, roles]) => {
      this.performance = performance.body;
      console.log(this.performance);
      this.roles = roles;
      // this.performance.sliderImage.map(item => {
      //   this.galleryImages.push(
      //     {
      //       small: item.images.post_main.url,
      //       medium: item.images.post_main.url,
      //       big: item.images.post_big.url,
      //     }
      //   );
      // });

      this.gateway.updateMeta(this.performance.title,
        this.performance.description,
        this.performance.mainPicture.performance_big.url);

      this.activeId = this.roles.length ? 'actors' : 'performance';

      this.loaderService.stop('performance-page');
    }, err => this.loaderService.stop('performance-page'));

    this.gateway.updateCanonicalURL();
  }
}
