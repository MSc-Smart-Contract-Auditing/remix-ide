import { flush, TestBed } from '@angular/core/testing';
import { SpinnerService } from '../../app/spinner/spinner.service';
import { SpinnerState, SpinnerMessage } from '../../app/models/spinner-state.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SpinnerService', () => {
    let service: SpinnerService;
    let minDisplayTime!: number;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SpinnerService);
        minDisplayTime = service.getMinDisplayTime();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit correct spinner state when show is called', fakeAsync(() => {
        let emittedState: SpinnerState | undefined;

        service.status$.subscribe(state => emittedState = state);
        service.show(SpinnerMessage.compiling);

        tick(); // Simulate the passage of time

        expect(emittedState).toEqual({ active: true, message: SpinnerMessage.compiling });

        flush();
    }));

    it('should emit correct spinner state when stop is called', fakeAsync(() => {
        let emittedState: SpinnerState | undefined;

        service.status$.subscribe(state => emittedState = state);
        service.stop();

        tick(); // Simulate the passage of time

        expect(emittedState).toEqual({ active: false, message: SpinnerMessage.empty });

        flush();
    }));

    it('should process queue correctly', fakeAsync(() => {
        let emittedStates: SpinnerState[] = [];

        service.status$.subscribe(state => emittedStates.push(state));

        service.show(SpinnerMessage.compiling);
        service.show(SpinnerMessage.analyzing);
        service.stop();

        // First state should be active and loading
        expect(emittedStates[0]).toEqual({ active: true, message: SpinnerMessage.compiling });
        tick(minDisplayTime);
        expect(emittedStates[1]).toEqual({ active: true, message: SpinnerMessage.analyzing });
        tick(minDisplayTime);
        expect(emittedStates[2]).toEqual({ active: false, message: SpinnerMessage.empty });

        flush();
    }));
});
