import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPanelComponent } from '../../app/info-panel/info-panel.component';

describe('InfoPanelComponent', () => {
    let component: InfoPanelComponent;
    let fixture: ComponentFixture<InfoPanelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InfoPanelComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InfoPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
