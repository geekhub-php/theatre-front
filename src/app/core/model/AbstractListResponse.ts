import { ListResponseInterface } from './ListResponseInterface';

export abstract class AbstractListResponse implements ListResponseInterface {
  total_count: number;
  page: number;
  count: number;
}
