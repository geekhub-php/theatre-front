import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/service/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit = '5';
  page: number;
  locale: string;
  listPost: Array<NewsItem> = [];
  collectionSize: number;

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService,
              private appRoutes: Router,
              private active: ActivatedRoute) {
  }

  ngOnInit() {
    this.active.queryParams.subscribe(params => this.getNews(params.limit, params.page, params.locale));
    this.page = +this.active.snapshot.queryParamMap.get('page') || 1;
    this.appRoutes.events.subscribe(() =>
      window.scrollTo(0, 0)
    );
    this.getNews(this.limit, this.page, this.locale);
  }

  goToPage(page: number) {
    const params = {page};
    this.page = page;
    this.appRoutes.navigate([], {
      relativeTo: this.active,
      queryParams: params
    });
  }

  getNews(limit, page, locale) {
    this.loaderService.start('news');
    this.gatewayService.getNews(this.limit, this.page, this.locale).subscribe(res => {
        this.listPost = res.posts;
        this.collectionSize = res.total_count;
        this.page = res.page;
        this.loaderService.stop('news');
      },
      err => this.loaderService.stop('news')
    );
  }
}
