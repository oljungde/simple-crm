import { TestBed } from '@angular/core/testing';

import { PasswordGenerateService } from './password-generate.service';

describe('PasswordGenerateService', () => {
  let service: PasswordGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
