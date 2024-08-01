import { RemixClient } from './remix-client';
import { catchError, lastValueFrom, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, tap, take } from 'rxjs';
import { prepareObject } from '../app/utils/contract.utils';
import { CompilationResult } from '../app/models/contract.model';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();
    currentFile$ = this.currentFileSubject.asObservable();
    private currentTargetFile?: string = undefined;
    private compilationResult$ = new Subject<CompilationResult>();

    constructor(private client: RemixClient) {
        this.client.onload(() => {
            this.registerCurrentFileEvent();
            this.registerCompilationEvent();
        });
    }

    private async registerCurrentFileEvent() {
        this.client.on('fileManager', 'currentFileChanged', (fileName: string) => {
            this.currentFileSubject.next(fileName);
        });
    }

    private async registerCompilationEvent() {
        this.client.on('solidity', 'compilationFinished', (target, source, _, data) => {
            // Check if compilation is triggered by the extension
            if (this.currentTargetFile !== target) return;

            this.currentTargetFile = undefined;
            this.compilationResult$.next(prepareObject(source, data, target));
        });
    }

    compile(filename: string): Promise<any> {
        this.currentTargetFile = filename;
        this.client.call('solidity', 'compile', filename);

        console.log("Compiling...");
        const observable = this.compilationResult$.pipe(
            take(1),
            tap(() => console.log("Processing...")),
            // TODO: use the api to process the data
            // switchMap((compilation_result: any) => {
            //     call the api with the object
            //     req = this.prepareObject(compilation_result, filename);
            //     return APP_ID.get('')
            // }),
            catchError((error) => {
                console.error('Error during compilation:', error);
                throw error;
            }),
            finalize(() => console.log("Analysis finished")),
        );

        return lastValueFrom(observable);
    }
}
