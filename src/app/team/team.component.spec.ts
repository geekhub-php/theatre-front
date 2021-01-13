import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from './team.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule,
        SpinnerModule,
        NgbAccordionModule
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
