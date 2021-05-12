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
  loading = true;
  loadingFull = true;
  galleryRows = 1;
  galleryColumns = 4;
  amount = 0;
  thumbnailHeight = 240;
  galleryImages: Array<NgxGalleryImage> = [];
  galleryOptions: Array<NgxGalleryOptions> = [
    {
      image: false,
      width: '100%',
      height: '240px',
      thumbnailsColumns: this.galleryColumns,
      thumbnailsRows: this.galleryRows,
      thumbnailMargin: 30,
      thumbnailSize: NgxGalleryImageSize.Cover,
      previewCloseOnEsc: true,
      previewAnimation: false,
      previewBullets: true,
      thumbnailsArrows: false,
      thumbnailsOrder: NgxGalleryOrder.Page,
      startIndex: null,
      arrowPrevIcon: 'fa fa-chevron-left',
      arrowNextIcon: 'fa fa-chevron-right',
      closeIcon: 'fas fa-times'
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
      this.roles = roles;
      if (this.performance.gallery) {
        this.performance.gallery.map(item => {
          this.galleryImages.push(
            {
              small: item.images.performance_big.url,
              medium: item.images.performance_big.url,
              big: item.images.performance_big.url,
            }
          );
        });
        this.amount = this.galleryImages.length - this.galleryColumns;
        this.loading = false;
      }
      this.gateway.updateMeta(this.performance.title,
        this.performance.description,
        this.performance.mainPicture.performance_big.url);

      this.activeId = this.roles.length ? 'actors' : 'performance';

      this.loaderService.stop('performance-page');
    }, err => this.loaderService.stop('performance-page'));

    this.gateway.updateCanonicalURL();
  }

  openGallery() {
    this.loading = true;
    this.galleryOptions[0].thumbnailsRows = Math.ceil(this.galleryImages.length / this.galleryColumns);
    this.galleryRows = this.galleryOptions[0].thumbnailsRows;
    this.galleryOptions[0].height = `${this.galleryRows * this.thumbnailHeight}px`;
    this.loadingFull = false;
  }

  closeGallery() {
    this.loadingFull = true;
    this.galleryOptions[0].thumbnailsRows = 1;
    this.galleryOptions[0].height = `${this.thumbnailHeight}px`;
    this.loading = false;
  }
}
