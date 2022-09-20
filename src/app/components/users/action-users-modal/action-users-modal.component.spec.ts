import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionUsersModalComponent } from './action-users-modal.component';

describe('ActionUsersModalComponent', () => {
  let component: ActionUsersModalComponent;
  let fixture: ComponentFixture<ActionUsersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionUsersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionUsersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
