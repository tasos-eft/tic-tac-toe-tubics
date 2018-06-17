import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWinnerComponent } from './show-winner.component';

describe('ShowWinnerComponent', () => {
  let component: ShowWinnerComponent;
  let fixture: ComponentFixture<ShowWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
