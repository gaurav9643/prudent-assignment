import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utility.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return word A', () => {
    const word = service.wordAutoCorrect('A', ['A', 'B', 'C']);
    expect(word).toBe('A');
  });

  it('should return word undefined', () => {
    const word = service.wordAutoCorrect('D', ['A', 'B', 'C']);
    expect(word).toBe(undefined);
  });
});
