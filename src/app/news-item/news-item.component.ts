import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() item: NewsItem;

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.gateway.createLinkForCanonicalURL();
  }
}
