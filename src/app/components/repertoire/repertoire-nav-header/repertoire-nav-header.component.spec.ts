import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoireNavHeaderComponent } from './repertoire-nav-header.component';

describe('RepertoireNavHeaderComponent', () => {
  let component: RepertoireNavHeaderComponent;
  let fixture: ComponentFixture<RepertoireNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepertoireNavHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertoireNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
