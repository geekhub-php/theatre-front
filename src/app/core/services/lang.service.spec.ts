import { TestBed } from '@angular/core/testing';

import { LangService } from './lang.service';

describe('LangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangService = TestBed.get(LangService);
    expect(service).toBeTruthy();
  });
});
