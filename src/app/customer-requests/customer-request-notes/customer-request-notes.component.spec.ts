import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestNotesComponent } from './customer-request-notes.component';

describe('CustomerRequestNotesComponent', () => {
  let component: CustomerRequestNotesComponent;
  let fixture: ComponentFixture<CustomerRequestNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRequestNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerRequestNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
