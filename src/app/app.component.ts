import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemixClientService } from './remix-client/remix-client.service';
import { SubscriptionHandler } from './utils/subscriptions.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    currentFile: string = 'No file selected';
    private subHandler = new SubscriptionHandler();
    active = true;

    constructor(private clientService: RemixClientService) { }

    ngOnInit(): void {
        this.subHandler.reg(this.clientService.currentFile$.subscribe(filename => {
            if (this.active) this.currentFile = filename;
        }));

        this.subHandler.reg(this.clientService.analysis$.subscribe((result: any) => {
            console.log(result);
        }));
    }

    compile(): void {
        this.active = false;
        this.clientService.compile(this.currentFile);
    }

    ngOnDestroy(): void {
        this.subHandler.unsubscribe();
    }
}
