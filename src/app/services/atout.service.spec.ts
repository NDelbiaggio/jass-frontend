import { TestBed, inject } from '@angular/core/testing';

import { AtoutService } from './atout.service';

describe('ChooseAtoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtoutService]
    });
  });

  it('should be created', inject([AtoutService], (service: AtoutService) => {
    expect(service).toBeTruthy();
  }));
});
