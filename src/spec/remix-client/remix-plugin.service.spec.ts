
import { RemixClientService } from "../../app/remix-client/remix-client.service";
import { TestBed } from "@angular/core/testing";
import { MockRemixClient } from "../mocks/remix-client";
import { RemixClient } from "../../app/remix-client/remix-client";
import { mockPreparedObject, mockTargetName } from "../mocks/compilation-results";

describe('RemixClientService', () => {
    let remixService: RemixClientService;
    const mockRemixClient: MockRemixClient = new MockRemixClient();
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RemixClientService,
                { provide: RemixClient, useValue: mockRemixClient },
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

    it('should compile and process the result', (done) => {
        // Mock the prepareObject function
        // spyOn(service as any, 'prepareObject').and.returnValue(mockPreparedObject);

        // Mock the postToApi function
        // const postToApiSpy = spyOn(service as any, 'postToApi').and.returnValue(of('API response'));
        const sub = remixService.analysis$.subscribe((result: any) => {
            expect(result).toEqual(mockPreparedObject);
            sub.unsubscribe();
            done();
        });

        remixService.compile(mockTargetName);
    });
});
