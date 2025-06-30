import { TestBed } from '@angular/core/testing';

import { CreateExamService } from './create-exam.service';

describe('CreateExamService', () => {
  let service: CreateExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
