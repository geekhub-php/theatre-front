import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NewsItem } from '../../store/news/NewsItem';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewChecked {
  limit = '5';
  page: number;
  listPost: Array<NewsItem> = [];
  collectionSize: number;

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => this.getNews(params.limit, params.page));
    this.page = +this.activeRoute.snapshot.queryParamMap.get('page') || 1;
    this.getNews(this.limit, this.page);
    this.gatewayService.updateCanonicalURL();
  }

  ngAfterViewChecked() {
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Новини Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  goToPage(page: number) {
    const params = { page };
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: params
    });
  }

  getNews(limit, page) {
    this.loaderService.start('news');
    this.gatewayService.getNews(this.limit, this.page).subscribe(res => {
        this.listPost = res.posts;
        this.collectionSize = res.total_count;
        this.page = res.page;
        this.loaderService.stop('news');
      },
      err => this.loaderService.stop('news')
    );
  }
}
