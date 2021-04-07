import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { RepertoireComponent } from './repertoire.component';
import { SpinnerModule } from '../partials/spinner/spinner.module';
import { StripHtmlModule } from '../../pipes/strip-html.module';

describe('PerformanceListComponent', () => {
  let component: RepertoireComponent;
  let fixture: ComponentFixture<RepertoireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        RepertoireComponent,
      ],
      imports: [HttpClientModule,
        RouterTestingModule,
        SpinnerModule,
        StripHtmlModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
