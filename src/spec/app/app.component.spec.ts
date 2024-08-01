import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app/app.component';

describe('AppComponent', () => {
    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
    });
});
