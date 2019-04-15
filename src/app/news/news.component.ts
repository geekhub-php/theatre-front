import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/service/gateway.service';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit = '10';
  listPost: Array<NewsItem> = [];

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.start('news');
    this.gatewayService.getNews(this.limit, '1', 'uk').subscribe((res: { posts }) => {
        this.listPost = res.posts;
        this.loaderService.stop('news');
      },
      err => this.loaderService.stop('news')
    );
    this.loaderService.start('news');
  }
}
