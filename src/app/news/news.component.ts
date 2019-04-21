import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/service/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NewsListResponse } from '../core/model/news/NewsListResponse';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnChanges {
  @Input() page: number; // What's needed here?
  limit = '5';

  locale: string;
  listPost: Array<NewsItem> = [];
  collectionSize: number;

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService,
              private appRoutes: Router,
              private active: ActivatedRoute) {
    this.appRoutes.events.subscribe((event) => { // It's listening events of routing?
      console.log(event);
    });
  }

  ngOnChanges(changes: SimpleChanges) { // Why doesn't it work?
    console.log(changes);
  }

  ngOnInit() {
    this.getNews(this.limit, this.page, this.locale);
    this.appRoutes.events.subscribe(() =>
      window.scrollTo(0, 0)
    );
  }

  getNews(limit, page, locale) {
    this.loaderService.start('news');
    this.gatewayService.getNews(this.limit, this.page, this.locale).subscribe(res => {
        this.listPost = res.posts;
        this.collectionSize = res.total_count;
        this.page = res.page;
        this.loaderService.stop('news');
        const newParams = {
          queryParams: {
            page: this.page
          }
        };
        this.appRoutes.navigate(['news'], newParams);
      },
      err => this.loaderService.stop('news')
    );
  }
}
