import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsItem } from '../../store/news/NewsItem';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { plainToClass } from 'class-transformer';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;
  gallery: any;
  newGallery: Array<string>;
  galleryOptions: Array<NgxGalleryOptions> = [
    {
      image: false,
      width: '1504px',
      thumbnailsColumns: 4,
      thumbnailMargin: 32,
      thumbnailClasses: ['thumbnail'],
      thumbnailsRemainingCount: true,
      height: '240px',
      previewCloseOnEsc: true,
      previewAnimation: false
    },
    {
      breakpoint: 770,
      width: '100%',
      thumbnailsColumns: 1,
      imageSize: 'cover'
    }
  ];

  galleryImages: Array<NgxGalleryImage> = [
    {
      small: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      medium: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      big: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      small: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      medium: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      big: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
      small: 'https://preview.ibb.co/mwsA6R/img7.jpg',
      medium: 'https://preview.ibb.co/mwsA6R/img7.jpg',
      big: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
      small: 'https://preview.ibb.co/kZGsLm/img8.jpg',
      medium: 'https://preview.ibb.co/kZGsLm/img8.jpg',
      big: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    },
  ];

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
          console.log('gallery', this.gallery);
          if (this.gallery.length) {
            this.gallery.map(item => this.newGallery.push(item.images.post_main.url));
            console.log('newGallery', this.newGallery);
          }
        }
        this.loaderService.stop('article');
        this.gateAway.updateMeta(this.item.title, this.item.text, this.item.mainPicture?.post_big?.url);
      },
      err => this.loaderService.stop('article')
    );
    this.gateAway.updateCanonicalURL();
  }
}
