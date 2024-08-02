import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpinnerModule } from './spinner/spinner.module';
import { FileSelectorModule } from "./file-selector/file-selector.module";
import { InfoPanelModule } from './info-panel/info-panel.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SpinnerModule,
        FileSelectorModule,
        InfoPanelModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
export class AppModule { }
