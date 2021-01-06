import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { GatewayService } from '../core/services/gateway.service';
import { NewsItem } from '../core/model/news/NewsItem';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewChecked {
  limit = '3';
  listPost: Array<NewsItem> = [];
  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService,
              private meta: Meta) { }

  ngOnInit() {
    this.loaderService.start('home');
    this.gatewayService.getNews(this.limit, 1, 'uk').subscribe((res: { posts }) => {
      this.listPost = res.posts;
      this.loaderService.stop('home');
    },
      err => this.loaderService.stop('home')
    );
  }

  ngAfterViewChecked() {
    this.updateMeta();
  }

  updateMeta() {
    this.meta.updateTag({property: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка'});
    this.meta.updateTag({property: 'og:description', content: 'Черкаський академічний музично-драматичний театр імені Тараса Григоровича Шевченка'});
    this.meta.updateTag({property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/assets/images/logo.png'});
  }
}
