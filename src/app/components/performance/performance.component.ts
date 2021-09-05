import { Component, HostListener, Inject, LOCALE_ID, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { LoaderService } from '../partials/spinner/loader.service';

import { Role } from '../../store/Role';
import { Breakpoints } from '../../constants';
import { GatewayService } from '../../services/gateway.service';
import { Performance } from '../../store/performance/Performance';
import { NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: [ './performance.component.scss' ],
  // disabled for styling innerHTML code
  // tslint:disable-next-line:use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
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

  @HostListener('window:resize', ['$event'])
  onResize(e?) {
    const { innerWidth } = window;
    const lgGallery = 4;
    const mdGallery = 3;
    const smGallery = 2;
    const xsGallery = 1;

    this.galleryOptions[0].thumbnailsColumns = innerWidth > Breakpoints.xl_min
      ? lgGallery : innerWidth > Breakpoints.md_min
        ? mdGallery : innerWidth > Breakpoints.sm_min
          ? smGallery : xsGallery;

    this.galleryOptions[0].thumbnailsRows = 1;
    this.galleryOptions[0].height = `${this.thumbnailHeight}px`;
    this.amount = this.galleryImages.length - this.galleryOptions[0].thumbnailsColumns;
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
    this.galleryOptions[0].thumbnailsRows = Math.ceil(this.galleryImages.length / this.galleryOptions[0].thumbnailsColumns);
    this.galleryOptions[0].height = `${this.galleryOptions[0].thumbnailsRows * this.thumbnailHeight}px`;
    this.loadingFull = false;
  }

  closeGallery() {
    this.loadingFull = true;
    this.galleryOptions[0].thumbnailsRows = 1;
    this.galleryOptions[0].height = `${this.thumbnailHeight}px`;
    this.loading = false;
  }
}
