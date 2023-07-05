import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestsDetailComponent } from './customer-requests-detail.component';

describe('CustomerRequestDetailComponent', () => {
  let component: CustomerRequestsDetailComponent;
  let fixture: ComponentFixture<CustomerRequestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerRequestsDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerRequestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
