import { AbstractListResponse } from '../AbstractListResponse';
import { NewsItem } from './NewsItem';

export class NewsListResponse extends AbstractListResponse {
  posts: number;
  listPost: Array<NewsItem>;
}
