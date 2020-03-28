import { NewsItem } from '../news/NewsItem';
import { Article, Person, WithContext } from 'schema-dts';

export class NewsItemSchema {
  static map(newsItem: NewsItem): WithContext<Article> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: newsItem.title,
      image: newsItem.mainPicture.post_big.url,
      datePublished: newsItem.created_at,
      dateModified: newsItem.updated_at,
      author:  {
        '@type': 'Person',
        name: 'newsItem.created_by',
        memberOf: ''
      },
      headline: 'headline'
    };
  }
}
