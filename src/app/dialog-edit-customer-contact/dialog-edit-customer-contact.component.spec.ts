import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCustomerContactComponent } from './dialog-edit-customer-contact.component';

describe('DialogEditCustomerContactComponent', () => {
  let component: DialogEditCustomerContactComponent;
  let fixture: ComponentFixture<DialogEditCustomerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditCustomerContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditCustomerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
