import { NewsItemImage } from './NewsItemImage';

export class NewsItem {
  title: string;
  text: string;
  slug: string;
  mainPicture: NewsItemImage;
  short_description: string;
  updated_at: string;
  created_at: string;
}
