import { EmployeeImageCollection } from './EmployeeImageCollection';
import { Type } from 'class-transformer';
import { GalleryImage } from './GalleryImage';

export class Employee {
  avatar: EmployeeImageCollection;
  biography: string;
  dob: string;
  first_name: string;
  @Type(() => GalleryImage)
  gallery: Array<GalleryImage>;
  last_name: string;
  position: string;
  slug: string;
}
