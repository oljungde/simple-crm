import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCustomerContactComponent } from './dialog-add-customer-contact.component';

describe('DialogAddCustomerContactComponent', () => {
  let component: DialogAddCustomerContactComponent;
  let fixture: ComponentFixture<DialogAddCustomerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddCustomerContactComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddCustomerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
