import { TestBed } from '@angular/core/testing';

import { MonthSelectService } from './month-select.service';

describe('MonthSelectService', () => {
  let service: MonthSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
