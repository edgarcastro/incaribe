import { TestBed, inject } from '@angular/core/testing';

import { SingleProjectService } from './single-project.service';

describe('SingleProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleProjectService]
    });
  });

  it('should ...', inject([SingleProjectService], (service: SingleProjectService) => {
    expect(service).toBeTruthy();
  }));
});
