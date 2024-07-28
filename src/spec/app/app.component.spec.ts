import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RemixClientService } from '../../remix-client/remix-client.service';
import { MockRemixClientService } from '../mocks/remix-client.service';

describe('AppComponent', () => {

    const mockRemixService: MockRemixClientService = new MockRemixClientService();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                { provide: RemixClientService, useValue: mockRemixService }
            ]
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize current file correctly', async () => {
        await TestBed.overrideProvider(RemixClientService, { useValue: mockRemixService }).compileComponents();
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain('No file selected');
    });

    it('should update the current file correctly', async () => {
        await TestBed.overrideProvider(RemixClientService, { useValue: mockRemixService }).compileComponents();

        const fixture = TestBed.createComponent(AppComponent);
        const expectedFileName = 'example.sol';
        const expectedFileName2 = 'example2.sol';

        fixture.detectChanges();
        mockRemixService.emit(expectedFileName);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain(expectedFileName);

        mockRemixService.emit(expectedFileName2);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain(expectedFileName2);
    });
});
