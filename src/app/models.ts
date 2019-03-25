/* tslint:disable:max-classes-per-file */
interface ListResponse {
  page: number;
}

export class PerformanceListResponse implements ListResponse {
  performances: Array<Performance>;
  page: number;
}

export class Performance {
  title: string;
  slug: string;
  description: string;
  mainPicture: ImageCollection;
  sliderImage: ImageCollection;
}

export class ImageCollection {
  reference: Image;
  performance_small: Image;
  performance_big: Image;
}

class ImageProperties {
  alt: string;
  title: string;
  src: string;
  width: number;
  height: number;
}

export class Image {
  url: string;
  properties: ImageProperties;
}
