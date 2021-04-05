import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { PersonComponent } from '../person/person.component';
import { PersonRolesComponent } from '../person-roles/person-roles.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamComponent,
        PersonComponent,
        PersonRolesComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule,
        NgxGalleryModule,
        SpinnerModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
