import { TestBed } from '@angular/core/testing';

import { MonthsCarouselService } from './months-carousel.service';

describe('MonthsCarouselService', () => {
  let service: MonthsCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
