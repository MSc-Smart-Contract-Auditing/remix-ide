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
    private subscription?: Subscription;

    constructor(private clientService: RemixClientService) { }

    ngOnInit(): void {
        this.subscription = this.clientService.currentFile$.subscribe(filename => {
            this.currentFile = filename;
        });
    }

    compile(): void {
        this.clientService.compile(this.currentFile).then((obj) => {
            console.log(obj);
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
