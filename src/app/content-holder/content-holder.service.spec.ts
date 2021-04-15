import { TestBed } from '@angular/core/testing';

import { ContentHolderService } from './content-holder.service';

describe('ContentHolderService', () => {
  let service: ContentHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
