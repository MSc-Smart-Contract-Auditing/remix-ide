import { SpinnerState } from "../../app/models/spinner-state.model";
import { Subject, map } from "rxjs";

export class MockSpinnerService {
    statusSubject = new Subject<SpinnerState>();
    status$ = this.statusSubject.asObservable();
    active$ = this.status$.pipe(map(state => state.active));
}