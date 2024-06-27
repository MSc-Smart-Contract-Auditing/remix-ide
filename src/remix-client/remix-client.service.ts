import { RemixClient } from './remix-client';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RemixClientService {
    constructor(private client: RemixClient) {
    }

    async connect() {
        this.client.onload(async () => {
            // const data = client.call('filemanager', 'readFile', 'ballot.sol');
            console.log('Client loaded');
        });
    }
}
