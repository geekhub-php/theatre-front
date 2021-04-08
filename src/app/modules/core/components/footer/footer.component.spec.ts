import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MainNavComponent } from '../main-nav/main-nav.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from './footer.component';
import { SpinnerModule } from '../../../../components/partials/spinner/spinner.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainNavComponent,
        FooterComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        SpinnerModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
