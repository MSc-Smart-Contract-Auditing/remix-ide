import { RemixClient } from './remix-client';
import { catchError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, switchMap } from 'rxjs';
import { prepareObject } from '../utils/contract.utils';
import { CompilationResult } from '../models/contract.model';
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';
import { SpinnerMessage } from '../models/spinner-state.model';
import { InfoPanelService } from '../info-panel/info-panel.service';
import { WebService } from '../web.service';
import { fromEventPattern } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    private currentFileSubject = new Subject<string>();
    currentFile$ = this.currentFileSubject.asObservable();
    private currentTargetFile?: string = undefined;

    constructor(
        private client: RemixClient,
        private spinnerService: SpinnerService,
        private infoPanelService: InfoPanelService,
        private webService: WebService,
    ) {
        this.client.onload(() => {
            this.registerCurrentFileEvent();
            this.generateAnalysisObservable().subscribe((response: any) => {
                this.webService.connectToWorker(response.socket);
            });
        });
    }

    private registerCurrentFileEvent() {
        this.client.on('fileManager', 'currentFileChanged', (fileName: string) => {
            this.currentFileSubject.next(fileName);
        });
    }

    private generateAnalysisObservable(): Observable<any> {
        return fromEventPattern<CompilationResult>(
            handler => this.client.on('solidity', 'compilationFinished',
                (target, source, _, data) => {
                    if (this.currentTargetFile !== target) return;
                    handler(prepareObject(source, data, target));
                }
            )
        ).pipe(
            tap(_ => this.spinnerService.show(SpinnerMessage.starting)),
            switchMap((compilationResult: CompilationResult) => {
                console.log("Files compiled. Submitting work...");
                return this.webService.submitWork(compilationResult);
            }),
            catchError((error) => {
                console.error('Error during compilation:', error);
                throw error;
            }),
        );
    }

    compile(filename: string): void {
        this.infoPanelService.activate(filename);
        this.spinnerService.show(SpinnerMessage.compiling);
        this.currentTargetFile = filename;
        this.client.call('solidity', 'compile', filename);
    }
}
