import { RemixClient } from './remix-client';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();

    constructor(private client: RemixClient) {
        this.client.onload(() => this.subscribeCurrentFile());
    }

    private async subscribeCurrentFile() {
        this.client.on('fileManager', 'currentFileChanged', (fileName: string) => {
            this.currentFileSubject.next(fileName);
        });
    }

    getCurrentFileObservable(): Observable<string> {
        return this.currentFileSubject.asObservable();
    }
}
