import { AbstractListResponse } from '../AbstractListResponse';
import { NewsItem } from './NewsItem';

export class NewsListResponse extends AbstractListResponse {
  posts: any;
  listPost: Array<NewsItem>;
}
