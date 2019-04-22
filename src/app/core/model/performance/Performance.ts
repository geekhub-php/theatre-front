import { PerformanceImageCollection } from './PerformanceImageCollection';
import { PerformanceGallery } from './PerformanceGallery';

export class Performance {
  title: string;
  slug: string;
  description: string;
  mainPicture: PerformanceImageCollection;
  sliderImage: PerformanceImageCollection;
  gallery?: Array<PerformanceGallery>;
  type?: string;
}
