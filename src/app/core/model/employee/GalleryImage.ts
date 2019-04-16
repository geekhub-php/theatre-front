import { Type } from 'class-transformer';
import { INgxGalleryImage } from 'ngx-gallery';
import { GalleryImageCollection } from './GalleryImageCollection';

export class GalleryImage implements INgxGalleryImage {
  decription: string;
  title: string;
  @Type(() => GalleryImageCollection)
  images: GalleryImageCollection;

  get small() {
    const image = this.images.performance_small || this.images.employee_small;
    if (image) return image.url;
  }

  get medium() {
    const image = this.images.performance_big || this.images.employee_big;
    if (image) return image.url;
  }

  get big() {
    const image = this.images.performance_big || this.images.employee_big;
    if (image) return image.url;
  }

  get description() {
    return this.decription;
  }

  get label() {
    return this.title;
  }
}
