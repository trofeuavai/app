import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayersMatchComponent } from './edit-players-match.component';

describe('EditPlayersMatchComponent', () => {
  let component: EditPlayersMatchComponent;
  let fixture: ComponentFixture<EditPlayersMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlayersMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayersMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
