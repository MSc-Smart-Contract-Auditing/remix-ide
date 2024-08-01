import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPanelComponent } from './info-panel.component';
import { SpinnerModule } from "../spinner/spinner.module";
import { HighlightModule, provideHighlightOptions } from 'ngx-highlightjs';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
    declarations: [InfoPanelComponent],
    imports: [
        CommonModule,
        SpinnerModule,
        HighlightModule,
    ],
    exports: [InfoPanelComponent],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                fullLibraryLoader: () => import('highlight.js'),
            }
        }
    ],
})
export class InfoPanelModule { }
