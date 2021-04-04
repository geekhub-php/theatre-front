import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeasonsComponent } from './seasons.component';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsComponent ],
      imports: [
        HttpClientModule,
        SpinnerModule,
        RouterTestingModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
