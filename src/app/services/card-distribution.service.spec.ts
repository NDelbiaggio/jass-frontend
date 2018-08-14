import { TestBed, inject } from '@angular/core/testing';

import { CardDistributionService } from './card-distribution.service';

describe('CardDistributionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDistributionService]
    });
  });

  it('should be created', inject([CardDistributionService], (service: CardDistributionService) => {
    expect(service).toBeTruthy();
  }));
});
