import { TestBed } from '@angular/core/testing';

import { StepWizardService } from './step-wizard.service';

describe('StepWizardService', () => {
  let service: StepWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
