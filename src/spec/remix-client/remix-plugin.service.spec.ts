
import { RemixClientService } from "../../remix-client/remix-client.service";
import { TestBed } from "@angular/core/testing";
import { MockRemixClient } from "../mocks/remix-client";
import { RemixClient } from "../../remix-client/remix-client";

describe('RemixClientService', () => {
    let service: RemixClientService;
    const mockRemixClient: MockRemixClient = new MockRemixClient();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RemixClientService,
                { provide: RemixClient, useValue: mockRemixClient }
            ]
        });

        service = TestBed.inject(RemixClientService);
    });

    it('should emit current file changes', (done) => {
        const expectedFileName = 'example.sol';
        const sub = service.getCurrentFileObservable().subscribe(fileName => {
            expect(fileName).toBe(expectedFileName);
            done();
        });

        mockRemixClient.triggerEvent('currentFileChanged', expectedFileName);
        sub.unsubscribe();
    });
});
