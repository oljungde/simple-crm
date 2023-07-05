import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditCustomerRequestComponent } from './dialog-edit-customer-request.component';

describe('DialogEditCustomerRequestComponent', () => {
  let component: DialogEditCustomerRequestComponent;
  let fixture: ComponentFixture<DialogEditCustomerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditCustomerRequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogEditCustomerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
