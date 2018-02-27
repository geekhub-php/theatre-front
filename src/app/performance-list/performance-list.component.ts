import { Component, OnInit } from '@angular/core';
import {PerformanceRepositoryService} from '../Repository/performance-repository.service';
import {Performance} from '../models';

@Component({
  selector: 'app-performance-list',
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss'],
  providers: [
      PerformanceRepositoryService
  ]
})
export class PerformanceListComponent implements OnInit {
  public performances: Performance[];
  constructor(private performanceRepository: PerformanceRepositoryService) { }

  ngOnInit() {
    this.performanceRepository.getList().subscribe(data => this.performances = data.performances);
  }

  onLoad(isSuccess, div) {
    if (isSuccess) {
        div.style.height = '100%';
        div.classList.remove('stub');
        console.dir(div);
    } else {
      // ToDo: add fallback image to src
      console.log('Error while loading image');
    }
  }
}
