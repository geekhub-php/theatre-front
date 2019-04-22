import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';
import { GatewayService } from '../core/service/gateway.service';
import { NewsItem } from '../core/model/news/NewsItem';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  limit = '3';
  listPost: Array<NewsItem> = [];
  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.start('home');
    this.gatewayService.getNews(this.limit, 1, 'uk').subscribe((res: { posts }) => {
      this.listPost = res.posts;
      this.loaderService.stop('home');
    },
      err => this.loaderService.stop('home')
    );
  }
}
