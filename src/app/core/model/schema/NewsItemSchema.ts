import { NewsItem } from '../news/NewsItem';
import { Article, WithContext } from 'schema-dts';

export class NewsItemSchema {
  static map(newsItem: NewsItem): WithContext<Article> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: newsItem.title,
      image: newsItem.mainPicture.post_big.url,
      datePublished: newsItem.created_at,
      dateModified: newsItem.updated_at,
      publisher: 'newsItem.updated_by',
      author: 'newsItem.created_by',
      headline: 'headline'
    };
  }
}
