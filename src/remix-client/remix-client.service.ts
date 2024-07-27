import { RemixClient } from './remix-client';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();

    constructor(private client: RemixClient) {
        this.client.onload(async () => {
            console.log('Client loaded');
            this.subscribeCurrentFile();
        });
    }

    async listdir(dir: string = '/'): Promise<string[]> {
        return this.client.call('fileManager', 'readdir', dir);
    }

    async currentFile(): Promise<string> {
        return this.client.call('fileManager', 'getCurrentFile');
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
