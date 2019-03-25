import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceListComponent } from './performance-list.component';
import { PerformanceService } from '../core/service/performance-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs/observable/of';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('PerformanceListComponent', () => {
  let component: PerformanceListComponent;
  let fixture: ComponentFixture<PerformanceListComponent>;
  const performanceRepositoryServiceStub = {
    getList: of([
      {
        title: 'Test Performance 1',
        description: 'Description of Test Performance 1',
        mainPicture: {
          performance_big: {
            properties: {
              height: 200,
              width: 100,
            }
          }
        }
      }
    ])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceListComponent ],
      imports: [
          HttpClientTestingModule,
          LazyLoadImageModule,
      ],
      providers: [
          {provide: PerformanceService, useValue: performanceRepositoryServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceListComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shold show test Performances', () => {
    fixture = TestBed.createComponent(PerformanceListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Repertoire');
  });
});
