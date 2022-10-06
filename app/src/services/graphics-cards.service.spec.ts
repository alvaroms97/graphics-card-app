import { TestBed } from '@angular/core/testing';

import { GraphicsCardsService } from './graphics-cards.service';

describe('GraphicsCardsService', () => {
  let service: GraphicsCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicsCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
