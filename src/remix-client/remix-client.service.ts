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

    async compile(filename: string): Promise<any> {
        // await this.client.call('solidity', 'compile', filename);
        const res = await this.client.call('solidity', 'getCompilationResult');
        console.log(res);
        return res.data?.sources[filename].ast;
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
