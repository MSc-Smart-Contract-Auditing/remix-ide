import { TestBed } from '@angular/core/testing';

import { InfoPanelService } from '../../app/info-panel/info-panel.service';

describe('InfoPanelService', () => {
    let service: InfoPanelService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InfoPanelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit the correct filename when activate is called', (done) => {
        const testFilename = 'test-file.txt';

        service.filename$.subscribe(filename => {
            expect(filename).toBe(testFilename);
            done();
        });

        service.activate(testFilename);
    });

    it('should emit the correct text when display is called', (done) => {
        const testText = 'Hello, World!';

        service.text$.subscribe(text => {
            expect(text).toBe(testText);
            done();
        });

        service.display(testText);
    });
});
