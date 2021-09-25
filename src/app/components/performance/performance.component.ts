import { Component, HostListener, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { LoaderService } from '../partials/spinner/loader.service';

import { Role } from '../../store/Role';
import { Breakpoints } from '../../constants';
import { GatewayService } from '../../services/gateway.service';
import { Performance } from '../../store/performance/Performance';
import { NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder } from '@kolkov/ngx-gallery';

enum galleryColumns {
  xs = 1,
  md = 2,
  xl = 3,
  xxl = 4,
}

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: [ './performance.component.scss' ],
  // disabled for styling innerHTML code
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None
})
export class PerformanceComponent implements OnInit {
  slug: string;
  loading = true;
  imageAmount = 0;
  activeId: string;
  roles: Array<Role>;
  loadingFull = true;
  xsBreakPoint = 468;
  thumbnailHeight = 240;
  performance: Performance;

  commonGalleryOptions = {
    image: false,
    width: '100%',
    startIndex: null,
    thumbnailsRows: 1,
    thumbnailMargin: 30,
    previewBullets: true,
    previewAnimation: false,
    thumbnailsArrows: false,
    previewCloseOnEsc: true,
    closeIcon: 'fas fa-times',
    height: `${this.thumbnailHeight}px`,
    arrowPrevIcon: 'fa fa-chevron-left',
    arrowNextIcon: 'fa fa-chevron-right',
    thumbnailsOrder: NgxGalleryOrder.Page,
    thumbnailSize: NgxGalleryImageSize.Cover
  };

  galleryImages: Array<NgxGalleryImage> = [];
  galleryOptions: Array<NgxGalleryOptions> = [
    {
      thumbnailsColumns: galleryColumns.xs,
      breakpoint: this.xsBreakPoint,
      ...this.commonGalleryOptions
    },
    {
      thumbnailsColumns: galleryColumns.md,
      breakpoint: Breakpoints.md_min,
      ...this.commonGalleryOptions
    },
    {
      thumbnailsColumns: galleryColumns.xl,
      breakpoint: Breakpoints.xl_min,
      ...this.commonGalleryOptions
    },
    {
      thumbnailsColumns: galleryColumns.xxl,
      ...this.commonGalleryOptions
    }
  ];

  constructor(@Inject(LOCALE_ID) private localeId: string,
              private gateway: GatewayService,
              private router: ActivatedRoute,
              private loaderService: LoaderService) {
    this.activeId = 'actors';
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);
  }

  @HostListener('window:resize', [ '$event' ])
  onResize(e?) {
    const { innerWidth } = window;
    const columnAmount = innerWidth > Breakpoints.xl_min
      ? galleryColumns.xxl : innerWidth > Breakpoints.md_min
        ? galleryColumns.xl : innerWidth > Breakpoints.sm_min
          ? galleryColumns.md : galleryColumns.xs;

    this.imageAmount = this.galleryImages.length - columnAmount;
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');

    forkJoin([
      this.gateway.getPerformanceBySlug(slug),
      this.gateway.getPerformanceRoles(slug)
    ]).subscribe(([ performance, roles ]) => {
      this.performance = performance.body;
      this.roles = roles;
      if (this.performance.gallery) {
        this.performance.gallery.map(item => {
          this.galleryImages.push(
            {
              small: item.images.performance_big.url,
              medium: item.images.performance_big.url,
              big: item.images.performance_big.url
            }
          );
        });
        this.loading = false;
      }
      this.gateway.updateMeta(this.performance.title,
        this.performance.description,
        this.performance.mainPicture.performance_big.url);

      this.activeId = this.roles.length ? 'actors' : 'performance';
      this.loaderService.stop('performance-page');
      this.onResize();
    }, err => this.loaderService.stop('performance-page'));
    this.gateway.updateCanonicalURL();
  }

  openGallery() {
    this.loading = true;
    this.galleryOptions.forEach((options, index) => {
      options.thumbnailsRows = Math.ceil(this.galleryImages.length / this.galleryOptions[index].thumbnailsColumns);
      options.height = `${this.galleryOptions[index].thumbnailsRows * this.thumbnailHeight}px`;
    });
    this.loadingFull = false;
  }

  closeGallery() {
    this.loadingFull = true;
    this.galleryOptions.forEach((options, index) => {
      options.thumbnailsRows = 1;
      options.height = `${this.thumbnailHeight}px`;
    });
    this.loading = false;
  }
}
