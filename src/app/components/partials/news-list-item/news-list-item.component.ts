import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../../store/news/NewsItem';
import { GatewayService } from '../../../services/gateway.service';

@Component({
  selector: 'app-news-list-item',
  templateUrl: './news-list-item.component.html',
  styleUrls: ['./news-list-item.component.scss']
})
export class NewsListItemComponent implements OnInit {
  @Input() item: NewsItem;
  defaultImg = 'assets/images/news/mask.jpg';

  constructor(private gatewayService: GatewayService) {
  }

  ngOnInit() {
    this.gatewayService.updateMeta(
      this.item.title,
      this.item.short_description,
      this.item.mainPicture?.post_big?.url
    );
    this.gatewayService.updateCanonicalURL();
  }
}
