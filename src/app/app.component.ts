import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemixClientService } from '../remix-client/remix-client.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'remix-plugin2';
    files: string[] = [];
    currentFile: string = 'No file selected';
    private subscription?: Subscription;

    constructor(private clientService: RemixClientService) { }

    ngOnInit(): void {
        this.subscription = this.clientService.getCurrentFileObservable().subscribe(filename => {
            this.currentFile = filename;
        });
    }

    loadFiles(): void {
        this.clientService.listdir().then(files => {
            this.files = Object.keys(files);
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
