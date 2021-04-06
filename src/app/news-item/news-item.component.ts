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
  defaultImg = '../../assets/images/cats.gif';

  constructor(private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayService.updateMeta(this.item.title,
      this.item.short_description,
      this.item.mainPicture.post_big.url);
    this.gatewayService.updateCanonicalURL();
  }
}
