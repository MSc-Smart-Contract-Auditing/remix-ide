import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemixClientService } from '../remix-client/remix-client.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    currentFile: string = 'No file selected';
    private fileSubscription?: Subscription;
    private analysisSubscription?: Subscription;

    constructor(private clientService: RemixClientService) { }

    ngOnInit(): void {
        this.fileSubscription = this.clientService.currentFile$.subscribe(filename => {
            this.currentFile = filename;
        });
        this.analysisSubscription = this.clientService.analysis$.subscribe((result: any) => {
            console.log(result);
        });
    }

    compile(): void {
        this.clientService.compile(this.currentFile);
    }

    ngOnDestroy(): void {
        this.fileSubscription?.unsubscribe();
        this.analysisSubscription?.unsubscribe();
    }
}
