import { ListResponseInterface } from '../ListResponseInterface';
import { History } from './History';

export class HestoryListResponse implements ListResponseInterface {
  total_count: number;
  count: number;
  history: Array<History>;
  page: number;
}
