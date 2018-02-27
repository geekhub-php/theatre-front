import { Component, OnInit } from '@angular/core';
import {PerformanceRepositoryService} from '../Repository/performance-repository.service';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss'],
  providers: [
      PerformanceRepositoryService
  ]
})
export class PerformanceListComponent implements OnInit {
  constructor(private performanceRepository: PerformanceRepositoryService) { }

  ngOnInit() {
  }

}
