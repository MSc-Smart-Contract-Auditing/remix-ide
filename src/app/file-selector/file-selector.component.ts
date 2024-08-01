import { Component, OnDestroy, OnInit } from '@angular/core';

import { RemixClientService } from '../remix-client/remix-client.service';
import { SubscriptionHandler } from '../utils/subscriptions.utils';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
    selector: 'app-file-selector',
    templateUrl: './file-selector.component.html',
    styleUrl: './file-selector.component.scss'
})
export class FileSelectorComponent implements OnDestroy {
    // TODO: Do NOT allow to compile if no file is selected
    currentFile: string = 'No file selected';
    private subHandler = new SubscriptionHandler();
    active = true;

    constructor(private clientService: RemixClientService, private spinnerService: SpinnerService) {
        this.subHandler.reg(
            this.clientService.currentFile$.subscribe(filename => {
                if (this.active) this.currentFile = filename;
            })
        );

        this.subHandler.reg(
            this.clientService.analysis$.subscribe((result: any) => {
                console.log(result);
            })
        );

        this.subHandler.reg(
            this.spinnerService.active$.subscribe(active => { this.active = !active; })
        );
    }

    compile(): void {
        this.clientService.compile(this.currentFile);
    }

    ngOnDestroy(): void {
        this.subHandler.unsubscribe();
    }
}
