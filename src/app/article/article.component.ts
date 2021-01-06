import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../core/services/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;

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
        this.loaderService.stop('article');
      },
      err => this.loaderService.stop('article')
    );
    this.gateAway.createLinkForCanonicalURL();
  }
}
