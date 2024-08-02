import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompilationResult } from './models/contract.model';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    readonly apiUrl: string = environment.apiEndpoint;
    readonly workerSocket: string = environment.workerSocket;

    constructor(private httpClient: HttpClient) { }

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
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        socket.onerror = (event) => {
            console.error('WebSocket error:', event);
        };
    }
}
