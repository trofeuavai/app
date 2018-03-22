import { TestBed, inject } from '@angular/core/testing';

import { TogglesidebarService } from './togglesidebar.service';

describe('TogglesidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TogglesidebarService]
    });
  });

  it('should be created', inject([TogglesidebarService], (service: TogglesidebarService) => {
    expect(service).toBeTruthy();
  }));
});
