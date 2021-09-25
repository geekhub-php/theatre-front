import { PerformanceImageCollection } from './PerformanceImageCollection';
import { PerformanceGallery } from './PerformanceGallery';
import { Season } from '../season/Season';

export class Performance {
  time: string;
  slug: string;
  venue: string;
  type?: string;
  title: string;
  date_time: Date;
  age_limit: number;
  description: string;
  seasons: Array<Season>;
  duration_in_min: number;
  gallery?: Array<PerformanceGallery>;
  mainPicture: PerformanceImageCollection;
  sliderImage: PerformanceImageCollection;
  producer: {
    slug: string,
    first_name: string,
    last_name: string
  };
}
