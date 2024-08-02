
import { RemixClientService } from "../../app/remix-client/remix-client.service";
import { TestBed } from "@angular/core/testing";
import { MockRemixClient } from "../mocks/remix-client";
import { RemixClient } from "../../app/remix-client/remix-client";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe('RemixClientService', () => {
    let remixService: RemixClientService;
    const mockRemixClient: MockRemixClient = new MockRemixClient();
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RemixClientService,
                { provide: RemixClient, useValue: mockRemixClient },
                provideHttpClient(withInterceptorsFromDi())
            ]
        });

        remixService = TestBed.inject(RemixClientService);
    });

    it('should emit current file changes', (done) => {
        const expectedFileName = 'example.sol';
        const sub = remixService.currentFile$.subscribe(fileName => {
            expect(fileName).toBe(expectedFileName);
            done();
        });

        mockRemixClient.triggerEvent('currentFileChanged', expectedFileName);
        sub.unsubscribe();
    });
});
