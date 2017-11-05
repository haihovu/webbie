import { TestBed, inject } from '@angular/core/testing';

import { ExdeploymentService } from './exdeployment.service';

describe('ExdeploymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExdeploymentService]
    });
  });

  it('should be created', inject([ExdeploymentService], (service: ExdeploymentService) => {
    expect(service).toBeTruthy();
  }));
});
