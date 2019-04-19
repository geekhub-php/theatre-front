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
  limit: string;
  page = 1;
  locale: string;
  listPost: Array<NewsItem> = [];

  total = {count: 50, data: []};
  config = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.total.count
  };

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService) {
    for (let i = 0; i < this.total.count; i++) {
      this.total.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }
  }

  onPageChange(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.loaderService.start('news');
    this.gatewayService.getNews(this.limit, this.page, this.locale).subscribe((res: { posts }) => {
        this.listPost = res.posts;
        this.loaderService.stop('news');
      },
      err => this.loaderService.stop('news')
    );
  }
}
