import { TestBed } from '@angular/core/testing';

import { WebService } from '../../app/web.service';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe('WebService', () => {
    let service: WebService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi())
            ]
        });
        service = TestBed.inject(WebService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
