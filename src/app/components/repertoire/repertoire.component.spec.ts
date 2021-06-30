import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { RepertoireComponent } from './repertoire.component';
import { RepertoireNavHeaderComponent } from './repertoire-nav-header/repertoire-nav-header.component';

describe('RepertoireComponent', () => {
  let component: RepertoireComponent;
  let fixture: ComponentFixture<RepertoireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepertoireComponent, RepertoireNavHeaderComponent ],
      imports: [
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        NgbPaginationModule
      ]
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
