import { History } from './History';
import { AbstractListResponse } from '../AbstractListResponse';

export class HistoryListResponse extends AbstractListResponse {
  history: Array<History>;
}
