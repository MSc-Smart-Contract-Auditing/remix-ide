import { createClient } from '@remixproject/plugin-webview';
import { PluginClient } from '@remixproject/plugin';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RemixClient extends PluginClient {
    constructor() {
        super();
        console.log("Creating client");
        createClient(this);
    }
}