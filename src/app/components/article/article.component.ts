import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NewsItem } from '../../store/news/NewsItem';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';
import { plainToClass } from 'class-transformer';
import { GalleryItem } from '../../store/news/GalleryItem';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;
  defaultImg = '../../assets/images/default.jpg';
  gallery: Array<GalleryItem>;

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
        this.gallery = res.gallery;
        this.loaderService.stop('article');
        this.gateAway.updateMeta(this.item.title, this.item.text, this.item.mainPicture?.post_big?.url);
      },
      err => this.loaderService.stop('article')
    );
    this.gateAway.updateCanonicalURL();
  }
}
