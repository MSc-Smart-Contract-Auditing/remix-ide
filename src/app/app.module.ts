import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpinnerModule } from './spinner/spinner.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FileSelectorModule } from "./file-selector/file-selector.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SpinnerModule,
        FileSelectorModule
    ],
    providers: [
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
