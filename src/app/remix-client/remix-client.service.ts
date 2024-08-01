import { RemixClient } from './remix-client';
import { catchError, lastValueFrom, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, tap, take } from 'rxjs';
import { prepareObject } from '../utils/contract.utils';
import { CompilationResult } from '../models/contract.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();
    currentFile$ = this.currentFileSubject.asObservable();
    private currentTargetFile?: string = undefined;
    private compilationResultSubject = new Subject<CompilationResult>();
    analysis$!: Observable<any>;

    constructor(private client: RemixClient) {
        this.client.onload(() => {
            this.registerCurrentFileEvent();
            this.registerCompilationEvent();
        });

        this.analysis$ = this.generateAnalysisObservable();
    }

    private registerCurrentFileEvent() {
        this.client.on('fileManager', 'currentFileChanged', (fileName: string) => {
            this.currentFileSubject.next(fileName);
        });
    }

    private registerCompilationEvent() {
        this.client.on('solidity', 'compilationFinished', (target, source, _, data) => {
            // Check if compilation is triggered by the extension
            if (this.currentTargetFile !== target) return;
            this.currentTargetFile = undefined;
            this.compilationResultSubject.next(prepareObject(source, data, target));
        });
    }

    private generateAnalysisObservable() {
        return this.compilationResultSubject.pipe(
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
            finalize(() => console.log("Analysis  finished")),
        );
    }

    compile(filename: string): void {
        console.log("Compiling...");
        this.currentTargetFile = filename;
        this.client.call('solidity', 'compile', filename);
    }
}
