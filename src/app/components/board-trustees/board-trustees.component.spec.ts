import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BoardTrusteesComponent } from './board-trustees.component';

describe('BoardTrusteesComponent', () => {
  let component: BoardTrusteesComponent;
  let fixture: ComponentFixture<BoardTrusteesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardTrusteesComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpClientTestingModule);
    fixture = TestBed.createComponent(BoardTrusteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
