import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RemixClientService } from '../../app/remix-client/remix-client.service';
import { MockRemixClientService } from '../mocks/remix-client.service';
import { SpinnerModule } from '../../app/spinner/spinner.module';
import { MockSpinnerService } from '../mocks/spinner.service';
import { SpinnerService } from '../../app/spinner/spinner.service';
import { emptySpinnerState, SpinnerMessage } from '../../app/models/spinner-state.model';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

    const mockRemixClientService: MockRemixClientService = new MockRemixClientService();
    const mockSpinnerService: MockSpinnerService = new MockSpinnerService();
    let fixture: any;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [
                BrowserModule,
                SpinnerModule,
            ],
            providers: [
                { provide: RemixClientService, useValue: mockRemixClientService },
                { provide: SpinnerService, useValue: mockSpinnerService },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(fixture).toBeTruthy();
    });

    it('should initialize current file correctly', async () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain('No file selected');
    });

    it('should update the current file correctly', async () => {
        const expectedFileName = 'example.sol';
        const expectedFileName2 = 'example2.sol';

        fixture.detectChanges();
        mockRemixClientService.emit(expectedFileName);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain(expectedFileName);

        mockRemixClientService.emit(expectedFileName2);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('p#filename').textContent).toContain(expectedFileName2);
    });

    it('should disable the Compile button when inactive', () => {
        mockSpinnerService.statusSubject.next(emptySpinnerState);
        fixture.detectChanges();

        const compileButton = fixture.debugElement.query(By.css('button'));
        expect(compileButton.nativeElement.disabled).toBeFalse();
    });

    it('should enable the Compile button when active', () => {
        mockSpinnerService.statusSubject.next({ active: true, message: SpinnerMessage.analyzing }); // Update mock observable
        fixture.detectChanges();

        const compileButton = fixture.debugElement.query(By.css('button'));
        expect(compileButton.nativeElement.disabled).toBeTrue();
    });
});
