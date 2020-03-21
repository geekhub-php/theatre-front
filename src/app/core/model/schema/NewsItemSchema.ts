import { NewsItem } from '../news/NewsItem';
import { Article, WithContext } from 'schema-dts';

export class NewsItemSchema {
  static map(newsItem: NewsItem): WithContext<Article> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: newsItem.title
    };
  }
}
