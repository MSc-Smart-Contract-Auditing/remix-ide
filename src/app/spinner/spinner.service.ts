import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { emptySpinnerState, SpinnerMessage, SpinnerState } from '../models/spinner-state.model';
import { map } from 'rxjs';
import { Progress } from '../models/spinner-state.model';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private statusSubject: Subject<SpinnerState> = new Subject<SpinnerState>();
    status$: Observable<SpinnerState> = this.statusSubject.asObservable();
    active$: Observable<boolean> = this.status$.pipe(map(state => state.active));

    private queue: SpinnerState[] = [];
    private isProcessing = false;
    private readonly minDisplayTime = 1000;

    constructor() { }

    show(message: SpinnerMessage): void {
        this.queue.push({ active: true, message });
        this.processQueue();
    }

    showDeterminate(message: SpinnerMessage, progress: Progress): void {
        this.queue.push({ active: true, message, progress });
        this.processQueue();
    }

    stop(): void {
        this.queue.push(emptySpinnerState);
        this.processQueue();
    }

    getMinDisplayTime(): number {
        return this.minDisplayTime;
    }

    private processQueue(): void {
        if (this.isProcessing || this.queue.length === 0) return;

        this.isProcessing = true;
        const currentState = this.queue.shift();

        if (!currentState) return;

        this.statusSubject.next(currentState);
        setTimeout(() => {
            this.isProcessing = false;
            this.processQueue();
        }, this.minDisplayTime);
    }
}
