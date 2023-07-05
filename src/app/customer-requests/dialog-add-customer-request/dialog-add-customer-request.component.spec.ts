import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCustomerRequestComponent } from './dialog-add-customer-request.component';

describe('DialogAddCustomerRequestComponent', () => {
  let component: DialogAddCustomerRequestComponent;
  let fixture: ComponentFixture<DialogAddCustomerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddCustomerRequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddCustomerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
