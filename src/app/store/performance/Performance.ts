import { PerformanceImageCollection } from './PerformanceImageCollection';
import { PerformanceGallery } from './PerformanceGallery';
import { Season } from '../season/Season';

export class Performance {
  title: string;
  slug: string;
  description: string;
  mainPicture: PerformanceImageCollection;
  sliderImage: PerformanceImageCollection;
  gallery?: Array<PerformanceGallery>;
  seasons: Array<Season>;
  type?: string;
}
