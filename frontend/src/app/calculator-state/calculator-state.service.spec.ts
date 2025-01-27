import { TestBed } from '@angular/core/testing';

import { CalculatorStateService } from './calculator-state.service';

describe('CalculatorStateService', () => {
  let service: CalculatorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
