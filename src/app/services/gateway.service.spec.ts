import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { GatewayService } from './gateway.service';


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
