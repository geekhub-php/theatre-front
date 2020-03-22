import { Movie, MediaObject, WithContext } from 'schema-dts';
import { Performance } from '../performance/Performance';
import { PerformanceGallery } from '../performance/PerformanceGallery';

export class PerformanceSchema {
  static map(performance: Performance): WithContext<Movie> {
    const gallery: Array<WithContext<MediaObject>> = performance.gallery.map((pGallery: PerformanceGallery) => {
      const mediaObject: WithContext<MediaObject> = {
        '@context': 'https://schema.org',
        '@type': 'MediaObject',
        contentUrl: pGallery.images.performance_big.url,
        height: '' + pGallery.images.performance_big.properties.height,
        width: '' + pGallery.images.performance_big.properties.width
      };

      return mediaObject;
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: performance.title,
      description: performance.description,
      genre: performance.type,
      inLanguage: 'uk',
      dateCreated: performance.premiere,
      thumbnailUrl: performance.mainPicture.performance_big.url,
      image: performance.mainPicture.reference.url,
      associatedMedia: gallery
    };
  }
}
