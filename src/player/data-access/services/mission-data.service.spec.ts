import { TestBed } from '@angular/core/testing';

import { MissionDataService } from './mission-data.service';

describe('MissionDataService', () => {
  let service: MissionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
