import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InfoPanelService {

    private filenameSubject = new Subject<string>();
    private textSubject = new Subject<string>();
    filename$ = this.filenameSubject.asObservable();
    text$ = this.textSubject.asObservable();

    constructor() { }

    activate(filename: string): void {
        this.filenameSubject.next(filename);
    }

    display(text: string): void {
        this.textSubject.next(text);
    }
}
