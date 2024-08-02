import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompilationResult } from './models/contract.model';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    readonly apiUrl: string = environment.apiEndpoint;

    constructor(private httpClient: HttpClient) { }

    submitWork(data: CompilationResult): Observable<any> {
        return this.httpClient.post(this.apiUrl + 'submit', data, { responseType: 'json' });
    }

    health() {
        return this.httpClient.get(this.apiUrl + 'health', { responseType: 'json' });
    }
}
