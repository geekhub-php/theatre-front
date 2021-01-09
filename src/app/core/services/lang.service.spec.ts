import { TestBed } from '@angular/core/testing';

import { LangService } from './lang.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LangService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangService],
      imports: [
        RouterTestingModule.withRoutes([])]
    });
  });

  it('should be created', () => {
    const service: LangService = TestBed.get(LangService);
    expect(service).toBeTruthy();
  });
});
