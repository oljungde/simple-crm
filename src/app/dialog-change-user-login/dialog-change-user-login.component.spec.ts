import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeUserLoginComponent } from './dialog-change-user-login.component';

describe('DialogChangeUserLoginComponent', () => {
  let component: DialogChangeUserLoginComponent;
  let fixture: ComponentFixture<DialogChangeUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChangeUserLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChangeUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
