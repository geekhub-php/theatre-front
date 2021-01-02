import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { Meta } from '@angular/platform-browser';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() item: NewsItem;

  constructor(private meta: Meta, private gatewayService: GatewayService) { }

  ngOnInit() {
    this.updateMeta();
    this.gatewayService.createLinkForCanonicalURL();
  }

  updateMeta() {
    this.meta.updateTag({property: 'og:title', content: this.item.title});
    this.meta.updateTag({property: 'og:description', content: this.item.short_description});
    this.meta.updateTag({property: 'og:image', content: this.item.mainPicture.post_big.url});
  }
}
