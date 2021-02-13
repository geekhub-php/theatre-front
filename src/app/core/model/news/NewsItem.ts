import { NewsItemImage } from './NewsItemImage';
import { GalleryImage } from './GalleryImage';
import { Type } from 'class-transformer';

export class NewsItem {
  title: string;
  text: string;
  slug: string;
  mainPicture: NewsItemImage;
  short_description: string;
  updated_at: string;
  created_at: string;
  @Type(() => GalleryImage)
  gallery: Array<GalleryImage>;
}
