import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    message: string = '';
    active: boolean = false;

    constructor(private spinnerService: SpinnerService) {
        this.spinnerService.status$.subscribe((state) => {
            console.log("new state", state);
            this.active = state.active;
            this.message = state.message;
        });
    }

}
