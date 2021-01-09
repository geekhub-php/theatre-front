import { TestBed } from '@angular/core/testing';

import { VisuallyImpairedService } from './visually-impaired.service';

describe('VisuallyImpairedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisuallyImpairedService = TestBed.get(VisuallyImpairedService);
    expect(service).toBeTruthy();
  });
});
