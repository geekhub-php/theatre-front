import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  @Input() item: NewsItem;
  constructor() { }
  ngOnInit(): void {
  }
}
