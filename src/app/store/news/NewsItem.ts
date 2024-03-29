import { NewsItemImage } from './NewsItemImage';
import { GalleryItem } from './GalleryItem';

export class NewsItem {
  title: string;
  text: string;
  slug: string;
  mainPicture: NewsItemImage;
  short_description: string;
  updated_at: string;
  created_at: string;
  gallery: Array<GalleryItem>;
}
