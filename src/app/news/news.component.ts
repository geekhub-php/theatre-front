import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/service/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit: string;
  page: number;
  locale: string;
  listPost: Array<NewsItem> = [];
  collectionSize: number;
  par: any;

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService,
              private appRoutes: Router) {
  }

  ngOnInit() {
    this.getNews(this.limit, this.page, this.locale);
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
    const newParams = {
      queryParams: {
        page: this.page
      }
    };
    this.appRoutes.navigate(['/news'], newParams);
  }
}
