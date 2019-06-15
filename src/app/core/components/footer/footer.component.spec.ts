import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MainNavComponent } from '../main-nav/main-nav.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from './footer.component';
import { HomePageModule } from '../../../home-page/home-page.module';
import { NgxGalleryModule } from 'ngx-gallery';
import { SpinnerModule } from '../../../shared/spinner/spinner.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

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
      ]
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
