import { Type } from 'class-transformer';
import { INgxGalleryImage } from '@kolkov/ngx-gallery';
import { GalleryImageCollection } from './GalleryImageCollection';

export class GalleryImage implements INgxGalleryImage {
  @Type(() => GalleryImageCollection)
  images: GalleryImageCollection;

  get small() {
    const image = this.images.post_small;
    if (!image) throw Error('small image undefined');
    if (image) return image.url;
  }

  get medium() {
    const image = this.images.post_big;
    if (!image) throw Error('big image undefined');
    if (image) return image.url;
  }

  get big() {
    const image = this.images.reference;
    if (!image) throw Error('reference image undefined');
    if (image) return image.url;
  }

  get description() {
    if (!this.images.reference.properties.alt) throw Error('alt image undefined');

    return this.images.reference.properties.alt;
  }

  get label() {
    if (!this.images.reference.properties.title) throw Error('title image undefined');

    return this.images.reference.properties.title;
  }
}
