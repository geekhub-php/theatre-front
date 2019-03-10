import { Component, OnInit } from '@angular/core';
import { PerformanceRepositoryService } from '../repository/performance-repository.service';
import { Performance } from '../models';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss'],
  providers: [
      PerformanceRepositoryService
  ]
})
export class PerformanceListComponent implements OnInit {
  performances: Array<Performance>;
  constructor(private performanceRepository: PerformanceRepositoryService) { }

  ngOnInit() {
    this.performanceRepository.getList().subscribe(data => this.performances = data.performances);
  }

  onLoad(isSuccess, div) {
    if (isSuccess) {
        div.style.height = '100%';
        div.classList.remove('stub');
    } else {
      // ToDo: add fallback image to src
      console.error('Error while loading image');
    }
  }
}
