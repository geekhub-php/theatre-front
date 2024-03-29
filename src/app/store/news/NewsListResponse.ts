import { AbstractListResponse } from '../AbstractListResponse';
import { NewsItem } from './NewsItem';

export class NewsListResponse extends AbstractListResponse {
  posts: Array<NewsItem>;
  total_count: number;
  page: number;
}
