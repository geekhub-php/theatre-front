import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PerformanceComponent } from './performance.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { WidgetModule } from '../widget/widget.module';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

describe('PerformanceComponent', () => {
  let component: PerformanceComponent;
  let fixture: ComponentFixture<PerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceComponent],
      imports: [
        NgbModule,
        HttpClientModule,
        RouterTestingModule,
        SpinnerModule,
        WidgetModule,
        NgxJsonLdModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
