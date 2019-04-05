import { AbstractListResponse } from '../AbstractListResponse';
import { News } from './News';

export class NewsListResponse extends AbstractListResponse{
  news: Array<News>;
}
