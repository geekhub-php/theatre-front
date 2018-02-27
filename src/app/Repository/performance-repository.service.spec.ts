import { TestBed, inject } from '@angular/core/testing';

import { PerformanceRepositoryService } from './performance-repository.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('PerformanceRepositoryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceRepositoryService],
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PerformanceRepositoryService], (service: PerformanceRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
