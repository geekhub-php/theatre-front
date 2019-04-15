import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceListComponent } from './performance-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '../shared/spinner/spinner.module';

describe('PerformanceListComponent', () => {
  let component: PerformanceListComponent;
  let fixture: ComponentFixture<PerformanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceListComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SpinnerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
