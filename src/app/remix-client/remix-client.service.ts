import { RemixClient } from './remix-client';
import { catchError, lastValueFrom, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, tap, of, switchMap } from 'rxjs';
import { prepareObject } from '../utils/contract.utils';
import { CompilationResult } from '../models/contract.model';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { SpinnerMessage } from '../models/spinner-state.model';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();
    currentFile$ = this.currentFileSubject.asObservable();
    private currentTargetFile?: string = undefined;
    private compilationResultSubject = new Subject<CompilationResult>();
    analysis$!: Observable<any>;

    constructor(private client: RemixClient, private spinnerService: SpinnerService) {
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

            setTimeout(() => {
                this.compilationResultSubject.next(prepareObject(source, data, target));
            }, 1000);

        });
    }

    private generateAnalysisObservable() {
        return this.compilationResultSubject.pipe(
            tap(() => this.spinnerService.show(SpinnerMessage.analyzing)),
            // TODO: use the api to process the data
            // switchMap((compilation_result: any) => {
            //     call the api with the object
            //     req = this.prepareObject(compilation_result, filename);
            //     return APP_ID.get('')
            // }),
            switchMap((compilationResult: CompilationResult) => {
                return of(compilationResult);
            }),
            catchError((error) => {
                console.error('Error during compilation:', error);
                throw error;
            }),
            tap(() => this.spinnerService.stop()),
        );
    }

    compile(filename: string): void {
        this.spinnerService.show(SpinnerMessage.compiling);
        this.currentTargetFile = filename;
        this.client.call('solidity', 'compile', filename);
    }
}
