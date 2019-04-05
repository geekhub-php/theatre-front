import { ImageCollection } from '../ImageCollection';


export class NewsItem {
  title: string;
  text: string;
  slug: string;
  mainPicture: ImageCollection;
  short_description: string;
  updated_at: string;
}
