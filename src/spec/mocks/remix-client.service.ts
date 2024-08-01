import { Subject, Observable } from 'rxjs';

export class MockRemixClientService {
    private currentFileSubject = new Subject<string>();
    currentFile$ = this.currentFileSubject.asObservable();
    analysis$ = new Observable<any>();

    getCurrentFileObservable(): Observable<string> {
        return this.currentFileSubject.asObservable();
    }

    emit(value: string) {
        this.currentFileSubject.next(value);
    }
}
