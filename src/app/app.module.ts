import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RemixClientService } from './remix-client/remix-client.service';
import { SpinnerService } from './spinner/spinner.service';
import { SpinnerModule } from './spinner/spinner.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SpinnerModule,
    ],
    providers: [
        RemixClientService,
        SpinnerService,
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
