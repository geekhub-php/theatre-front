import { ImageCollection } from '../ImageCollection';
import { Type } from 'class-transformer';
import { INgxGalleryImage } from 'ngx-gallery';

export class GalleryImage implements INgxGalleryImage {
  decription: string;
  title: string;
  @Type(() => ImageCollection)
  images: ImageCollection;

  get small() {
    return this.images.performance_small.url;
  }

  get medium() {
    return this.images.performance_big.url;
  }

  get big() {
    return this.images.performance_big.url;
  }

  get description() {
    return this.decription;
  }

  get label() {
    return this.title;
  }
}
