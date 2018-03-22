import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoachesComponent } from './add-coaches.component';

describe('AddCoachesComponent', () => {
  let component: AddCoachesComponent;
  let fixture: ComponentFixture<AddCoachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
