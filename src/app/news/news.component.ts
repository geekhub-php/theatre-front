import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/service/gateway.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  limit = '10';
  listPost: Array<NewsItem> = [];
  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
    this.gatewayService.getNews(this.limit, '1', 'uk').subscribe((res: { posts }) => {
      this.listPost = res.posts;
    });
  }
}
