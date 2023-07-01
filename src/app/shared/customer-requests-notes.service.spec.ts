import { TestBed } from '@angular/core/testing';

import { CustomerRequestsNotesService } from './customer-requests-notes.service';

describe('CustomerRequestsNotesService', () => {
  let service: CustomerRequestsNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRequestsNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});