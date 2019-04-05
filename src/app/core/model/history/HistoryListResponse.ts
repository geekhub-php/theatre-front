import { History } from './History';
import { AbstractListResponse } from '../AbstractListResponse';

export class HestoryListResponse extends AbstractListResponse {
  history: Array<History>;
}
