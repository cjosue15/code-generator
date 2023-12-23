import { TestBed } from '@angular/core/testing';

import { GoogleGeminiService } from './google-gemini.service';

describe('GoogleGeminiService', () => {
  let service: GoogleGeminiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGeminiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
