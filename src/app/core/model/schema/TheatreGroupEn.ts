import { TheaterGroup, WithContext, Place, GeoCoordinates } from 'schema-dts';

const geo: WithContext<GeoCoordinates> = {
  '@context': 'https://schema.org',
  '@type': 'GeoCoordinates',
  latitude: 555,
  longitude: 555,
  postalCode: '',
  addressCountry: 'Ukraine',
  address: '',
};

const location: WithContext<Place> = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  geo: geo,
  hasMap: 'https://www.google.com/maps?ll=49.441986,32.061327&z=16&t=m&hl=en-US&gl=UA&mapclient=embed&cid=9899641005179411837',
};

export class TheatreGroupEn {
  static map(): WithContext<TheaterGroup> {
    return {
      '@context': 'https://schema.org',
      '@type': 'TheaterGroup',
      logo: '',
      name: 'Cherkasy theatre',
      url: '',
      location: location
    };
  }
}
