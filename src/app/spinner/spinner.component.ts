import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { emptySpinnerState, Progress, SpinnerState } from '../models/spinner-state.model';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    state: SpinnerState = emptySpinnerState;
    mode: ProgressSpinnerMode = 'indeterminate';
    value: number = 0;

    constructor(private spinnerService: SpinnerService) {
        this.spinnerService.status$.subscribe((state) => {
            this.state = state;
            this.reflectProgress(state.progress);
        });
    }

    private reflectProgress(progress?: Progress): void {
        if (progress) {
            this.mode = 'determinate';
            this.value = progress.current / progress.total * 100;
        } else {
            this.mode = 'indeterminate';
            this.value = 0;
        }

    }
}
