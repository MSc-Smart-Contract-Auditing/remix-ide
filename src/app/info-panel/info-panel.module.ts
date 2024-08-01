import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPanelComponent } from './info-panel.component';

@NgModule({
    declarations: [InfoPanelComponent],
    imports: [
        CommonModule
    ],
    exports: [InfoPanelComponent],
})
export class InfoPanelModule { }
