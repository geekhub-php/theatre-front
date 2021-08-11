import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoireNavHeaderComponent } from './repertoire-nav-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RepertoireNavHeaderComponent', () => {
  let component: RepertoireNavHeaderComponent;
  let fixture: ComponentFixture<RepertoireNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepertoireNavHeaderComponent ],
      imports: [ RouterTestingModule ],
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
