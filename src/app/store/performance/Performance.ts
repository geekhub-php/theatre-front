import { PerformanceImageCollection } from './PerformanceImageCollection';
import { PerformanceGallery } from './PerformanceGallery';
import { Season } from '../season/Season';

export class Performance {
  age_limit: number;
  title: string;
  slug: string;
  description: string;
  mainPicture: PerformanceImageCollection;
  sliderImage: PerformanceImageCollection;
  gallery?: Array<PerformanceGallery>;
  seasons: Array<Season>;
  type?: string;
  duration_in_min: number;
}
