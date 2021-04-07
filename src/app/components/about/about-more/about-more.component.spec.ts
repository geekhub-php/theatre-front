import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AboutMoreComponent } from './about-more.component';
import { SpinnerModule } from '../../partials/spinner/spinner.module';

describe('AboutMoreComponent', () => {
  let component: AboutMoreComponent;
  let fixture: ComponentFixture<AboutMoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMoreComponent],
      imports: [SpinnerModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
