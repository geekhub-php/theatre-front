import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { NewsItem } from '../core/model/news/NewsItem';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  listPost: Array<NewsItem>;
  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
    this.gatewayService.getNews('3', '1', 'uk').subscribe((res: { posts }) => {
      this.listPost = res.posts;
    });
  }
}
