import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCustomerRequestNoteComponent } from './dialog-add-customer-request-note.component';

describe('DialogAddCustomerRequestNoteComponent', () => {
  let component: DialogAddCustomerRequestNoteComponent;
  let fixture: ComponentFixture<DialogAddCustomerRequestNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddCustomerRequestNoteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddCustomerRequestNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
