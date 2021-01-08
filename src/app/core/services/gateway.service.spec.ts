import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { GatewayService } from './gateway.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('PerformanceRepositoryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewayService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([GatewayService], (service: GatewayService) => {
    expect(service).toBeTruthy();
  }));
});
