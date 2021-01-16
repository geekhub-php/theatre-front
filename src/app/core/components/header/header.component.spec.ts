import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MainNavComponent } from '../main-nav/main-nav.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomePageModule } from '../../../home-page/home-page.module';
import { SpinnerModule } from '../../../shared/spinner/spinner.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainNavComponent,
        FooterComponent,
        HeaderComponent
      ],
      imports: [
        HomePageModule,
        RouterTestingModule,
        SpinnerModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
