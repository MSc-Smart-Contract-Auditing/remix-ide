import { TestBed } from '@angular/core/testing';

import { RemixClientService } from '../../app/remix/remix-client.service';

describe('RemixPluginService', () => {
    let service: RemixClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RemixClientService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
