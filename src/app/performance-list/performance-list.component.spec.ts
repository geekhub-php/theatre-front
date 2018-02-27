import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceListComponent } from './performance-list.component';
import {PerformanceRepositoryService} from '../Repository/performance-repository.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs/observable/of';

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
      imports: [ HttpClientTestingModule ],
      providers: [
          {provide: PerformanceRepositoryService, useValue: performanceRepositoryServiceStub}
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
