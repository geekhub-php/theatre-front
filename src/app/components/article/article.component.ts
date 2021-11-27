import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsItem } from '../../store/news/NewsItem';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { plainToClass } from 'class-transformer';
import { NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder } from '@kolkov/ngx-gallery';
import { GalleryItem } from '../../store/news/GalleryItem';
import { WindowRefService } from '../../services/window-ref.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;
  defaultImg = 'assets/images/default.jpg';
  gallery: Array<GalleryItem> = [];
  loading = true;
  galleryColumns = 4;
  galleryRows = null;
  thumbnailHeight = 240;
  galleryOptions: Array<NgxGalleryOptions>;
  galleryImages: Array<NgxGalleryImage> = [];

  constructor(private router: ActivatedRoute,
              private gateAway: GatewayService,
              private windowRef: WindowRefService,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getGalleryColumns();
    this.getGalleryOptions();
    this.getArticle();
  }

  getArticle() {
    this.loaderService.start('article');
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateAway.getNewsBySlug(slug).subscribe((res) => {
        this.item = plainToClass(NewsItem, res);
        this.gallery = res.gallery;
        this.updateGalleryOptions();

        if (res.gallery) {
          this.gallery = res.gallery;

          if (this.gallery.length) {
            this.gallery.map(item => {
              this.galleryImages.push(
                {
                  small: item.images.post_main.url,
                  medium: item.images.post_main.url,
                  big: item.images?.post_big.url,
                }
              );
            });
          }
        }
        this.loading = false;
        this.loaderService.stop('article');
        this.gateAway.updateMeta(this.item.title, this.item.text, this.item.mainPicture.post_big.url);
      },
      err => this.loaderService.stop('article')
    );
    this.gateAway.updateCanonicalURL();
  }

  getGalleryOptions() {
    this.galleryOptions = [
      {
        image: false,
        width: '100%',
        thumbnailsColumns: this.galleryColumns,
        thumbnailsRows: this.galleryRows,
        thumbnailMargin: 32,
        thumbnailSize: NgxGalleryImageSize.Cover,
        previewCloseOnEsc: true,
        previewAnimation: false,
        previewBullets: true,
        thumbnailsOrder: NgxGalleryOrder.Page,
        startIndex: null,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        closeIcon: 'fas fa-times'
      }
    ];
  }

  updateGalleryOptions() {
    if (this.gallery?.length) {
      this.galleryOptions[0].thumbnailsRows = Math.ceil(this.gallery.length / this.galleryColumns);
      this.galleryRows = this.galleryOptions[0].thumbnailsRows;
      this.galleryOptions[0].height = `${this.galleryRows * this.thumbnailHeight}px`;
    }
  }

  getGalleryColumns() {
  if (!this.windowRef.isPlatformBrowser) return;

    const wideScreenSize = 768;
    const mediumScreenSize = 450;
    const wideScreenColumns = 4;
    const mediumScreenColumns = 2;
    this.galleryColumns =
      this.windowRef.nativeWindow.screen.width > wideScreenSize ? wideScreenColumns :
        this.windowRef.nativeWindow.screen.width > mediumScreenSize ? mediumScreenColumns : 1;
  }
}
