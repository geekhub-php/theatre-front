import { ImageCollection } from './ImageCollection';

export class Performance {
  title: string;
  slug: string;
  description: string;
  mainPicture: ImageCollection;
  sliderImage: ImageCollection;
  gallery?: ImageCollection;
}
