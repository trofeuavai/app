import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoachesComponent } from './edit-coaches.component';

describe('EditCoachesComponent', () => {
  let component: EditCoachesComponent;
  let fixture: ComponentFixture<EditCoachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
