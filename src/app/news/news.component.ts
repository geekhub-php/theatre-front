import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/services/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

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
              private appRoutes: Router,
              private active: ActivatedRoute,
              private meta: Meta) {
  }

  ngOnInit() {
    this.active.queryParams.subscribe(params => this.getNews(params.limit, params.page));
    this.page = +this.active.snapshot.queryParamMap.get('page') || 1;
    this.appRoutes.events.subscribe(() =>
      window.scrollTo(0, 0)
    );
    this.getNews(this.limit, this.page);
    this.gatewayService.updateCanonicalURL();
  }

  ngAfterViewChecked() {
    this.updateMeta();
  }

  goToPage(page: number) {
    const params = { page };
    this.page = page;
    this.appRoutes.navigate([], {
      relativeTo: this.active,
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

  updateMeta() {
    this.meta.updateTag({ property: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Новини Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка'
    });
    this.meta.updateTag({ property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/assets/images/logo.png' });
  }
}
