import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPanelComponent } from '../../app/info-panel/info-panel.component';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerModule } from '../../app/spinner/spinner.module';
import { FileSelectorModule } from '../../app/file-selector/file-selector.module';
import { By } from '@angular/platform-browser';
import { ElementType } from '../../app/utils/text-format.utils';
import { textToElements } from '../../app/utils/text-format.utils';

describe('InfoPanelComponent', () => {
    let component: InfoPanelComponent;
    let fixture: ComponentFixture<InfoPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfoPanelComponent],
            imports: [
                BrowserModule,
                SpinnerModule,
                FileSelectorModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(InfoPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display filename when filename is set', () => {
        component.filename = 'Test File';
        fixture.detectChanges();

        const filenameElement = fixture.debugElement.query(By.css('.card-header h2')).nativeElement;
        expect(filenameElement.textContent).toContain('Test File');
    });

    it('should display body when body is set and loading is false', () => {
        component.elements = textToElements('This is the body content');
        component.filename = 'Test File';
        component.loading = false;
        fixture.detectChanges();

        const bodyElement = fixture.debugElement.query(By.css('.card-body div#body')).nativeElement;
        expect(bodyElement.textContent).toContain('This is the body content');
    });

    it('should not display body when loading is true', () => {
        component.loading = true;
        component.filename = 'Test File';
        fixture.detectChanges();

        const bodyElement = fixture.debugElement.query(By.css('div#body'));
        expect(bodyElement).toBeNull();
    });

    it('should not display anything when filename is not set', () => {
        component.filename = '';
        fixture.detectChanges();

        const containerElement = fixture.debugElement.query(By.css('.container'));
        expect(containerElement).toBeNull();
    });

    it('should not display anything when filename is not set', () => {
        component.filename = '';
        fixture.detectChanges();

        const containerElement = fixture.debugElement.query(By.css('.container'));
        expect(containerElement).toBeNull();
    });
});
