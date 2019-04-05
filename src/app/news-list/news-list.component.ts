import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { News } from '../core/model/news/News';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  new: News;
  news: Array<News>;
  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
    this.gatewayService.getNews().subscribe((res: { post }) => {
      this.new = res.post;
    });
   //this.gatewayService.getNews()
   //.subscribe((data: News) => {
   //  console.log(News);
   //});
  }
}
