import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemixClientService } from '../remix-client/remix-client.service';
import { Subscription } from 'rxjs';
import { SubscriptionHandler } from './utils/subscriptions.utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    currentFile: string = 'No file selected';

    private subHandler = new SubscriptionHandler();
    private fileSubscription?: Subscription;
    private analysisSubscription?: Subscription;

    constructor(private clientService: RemixClientService) { }

    ngOnInit(): void {
        this.subHandler.reg(this.clientService.currentFile$.subscribe(filename => {
            this.currentFile = filename;
        }));

        this.subHandler.reg(this.clientService.analysis$.subscribe((result: any) => {
            console.log(result);
        }));
    }

    compile(): void {
        this.clientService.compile(this.currentFile);
    }

    ngOnDestroy(): void {
        this.subHandler.unsubscribe();
    }
}
