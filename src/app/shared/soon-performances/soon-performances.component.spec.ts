import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SoonPerformancesComponent } from './soon-performances.component';

describe('SoonPerformancesComponent', () => {
  let component: SoonPerformancesComponent;
  let fixture: ComponentFixture<SoonPerformancesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SoonPerformancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoonPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
