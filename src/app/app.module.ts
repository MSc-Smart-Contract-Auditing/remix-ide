import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RemixClientService } from '../remix-client/remix-client.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
    ],
    providers: [
        RemixClientService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
