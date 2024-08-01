import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from '../../app/spinner/spinner.component';
import { SpinnerModule } from '../../app/spinner/spinner.module';
import { SpinnerService } from '../../app/spinner/spinner.service';
import { MockSpinnerService } from '../mocks/spinner.service';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SpinnerMessage } from '../../app/models/spinner-state.model';


describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;
    const mockSpinnerService: MockSpinnerService = new MockSpinnerService();

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SpinnerComponent],
            imports: [SpinnerModule],
            providers: [
                { provide: SpinnerService, useValue: mockSpinnerService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the spinner and message when active', async () => {
        mockSpinnerService.statusSubject.next({ active: true, message: SpinnerMessage.compiling });
        fixture.detectChanges();
        const message = fixture.nativeElement.querySelector('h3#message');
        expect(message).toBeTruthy();
        expect(fixture.nativeElement.querySelector('h3#message').textContent).toContain(SpinnerMessage.compiling);

        const spinner = fixture.nativeElement.querySelector('mat-progress-spinner');
        expect(spinner).toBeTruthy();
    });

    it('should not display the spinner and message when inactive', () => {
        // Update the mock observable
        mockSpinnerService.statusSubject.next({ active: false, message: SpinnerMessage.empty });
        fixture.detectChanges();

        const spinnerElement = fixture.debugElement.query(By.css('mat-progress-spinner'));
        const messageElement = fixture.debugElement.query(By.css('h3'));

        expect(component.active).toBeFalse();
        expect(component.message).toBe('');
        expect(spinnerElement).toBeFalsy();
        expect(messageElement).toBeFalsy();
    });

    it('should update the message when the spinner state changes', () => {
        // Update the mock observable
        mockSpinnerService.statusSubject.next({ active: true, message: SpinnerMessage.analyzing });
        fixture.detectChanges();

        const messageElement = fixture.debugElement.query(By.css('h3#message'));
        expect(component.message).toBe(SpinnerMessage.analyzing);
        expect(messageElement.nativeElement.textContent).toContain(SpinnerMessage.analyzing);
    });
});
