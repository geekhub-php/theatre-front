import { Component, OnInit } from '@angular/core';
import { NewsItem } from '../core/model/news/NewsItem';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../core/service/gateway.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  item: NewsItem;
  posts: Array<NewsItem>;

  constructor(private router: ActivatedRoute, private gateAway: GatewayService) {
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateAway.getNewsBySlug(slug).subscribe((res) => {
      this.item = res.body;
    });
  }

}
