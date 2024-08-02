import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompilationResult } from './models/contract.model';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';
import { InfoPanelService } from './info-panel/info-panel.service';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    readonly apiUrl: string = environment.apiEndpoint;
    readonly workerSocket: string = environment.workerSocket;

    constructor(
        private httpClient: HttpClient,
        private spinnerService: SpinnerService,
        private infoPanelService: InfoPanelService) { }

    submitWork(data: CompilationResult): Observable<any> {
        return this.httpClient.post(this.apiUrl + 'submit', data, { responseType: 'json' });
    }

    connectToWorker(socketId: string): void {

        const socket = new WebSocket(this.workerSocket + "ws/" + socketId);

        socket.onopen = (event) => {
            console.log('WebSocket connection opened:', event);
        };

        socket.onmessage = (event) => {
            console.log('WebSocket message received:', event.data);

            const data = JSON.parse(event.data);

            if (data.result) {
                this.infoPanelService.display(data.result);
                this.spinnerService.stop();
            }
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            this.spinnerService.stop();
        };

        socket.onerror = (event) => {
            console.error('WebSocket error:', event);
        };
    }
}
