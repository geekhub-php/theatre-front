import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsItem } from '../../store/news/NewsItem';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { plainToClass } from 'class-transformer';
import { NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions, NgxGalleryOrder } from '@kolkov/ngx-gallery';
import { GalleryItem } from '../../store/news/GalleryItem';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;
  gallery: Array<GalleryItem> = [];
  loading = true;
  galleryColumns = 4;
  galleryRows = null;
  thumbnailHeight = 240;
  galleryOptions: Array<NgxGalleryOptions> = [
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
      arrowPrevIcon: 'fa fa-chevron-left',
      arrowNextIcon: 'fa fa-chevron-right',
      closeIcon: 'fas fa-times'
    },
    {
      breakpoint: 770,
      width: '100%',
      thumbnailsColumns: 1,
      imageSize: 'cover'
    }
  ];

  galleryImages: Array<NgxGalleryImage> = [];

  constructor(private router: ActivatedRoute,
              private gateAway: GatewayService,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.loaderService.start('article');
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateAway.getNewsBySlug(slug).subscribe((res) => {
        this.item = plainToClass(NewsItem, res);

        if (res.gallery) {
          this.gallery = res.gallery;

          if (this.gallery.length) {
            this.galleryOptions[0].thumbnailsRows = Math.ceil(this.gallery.length / this.galleryColumns);
            this.galleryRows = this.galleryOptions[0].thumbnailsRows;
            this.galleryOptions[0].height = `${this.galleryRows * this.thumbnailHeight}px`;
            this.gallery.map(item => {
              this.galleryImages.push(
                {
                  small: item.images.post_main.url,
                  medium: item.images.post_main.url,
                  big: item.images.post_big.url,
                }
              );
            });
          }
        }
        this.loading = false;
        this.loaderService.stop('article');
        this.gateAway.updateMeta(this.item.title, this.item.text, this.item.mainPicture?.post_big?.url);
      },
      err => this.loaderService.stop('article')
    );
    this.gateAway.updateCanonicalURL();
  }
}
