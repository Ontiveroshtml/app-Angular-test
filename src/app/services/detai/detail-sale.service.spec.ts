import { TestBed } from '@angular/core/testing';

import { DetailSaleService } from './detail-sale.service';

describe('DetailSaleService', () => {
  let service: DetailSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
