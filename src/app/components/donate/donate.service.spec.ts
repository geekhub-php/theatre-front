import { TestBed } from '@angular/core/testing';

import { DonateService } from './donate.service';

describe('DonateService', () => {
  let service: DonateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
