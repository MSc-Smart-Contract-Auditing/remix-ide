import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPanelComponent } from './info-panel.component';
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
    declarations: [InfoPanelComponent],
    imports: [
        CommonModule,
        SpinnerModule
    ],
    exports: [InfoPanelComponent],
})
export class InfoPanelModule { }
