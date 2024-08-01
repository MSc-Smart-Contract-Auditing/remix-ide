import { mockTargetName, mockSource, mockData } from "./compilation-results";

export class MockRemixClient {
    private eventListeners: { [key: string]: Function[]; } = {};

    onload(callback: Function) {
        callback();
    }

    on(plugin: string, event: string, callback: Function) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    call(name: string, method: string, ...args: any[]) {
        if (name === 'solidity' && method === 'compile') {
            this.triggerEvent('compilationFinished', mockTargetName, mockSource, 'sol', mockData);
        }
    }

    triggerEvent(event: string, ...args: any[]) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(async callback => await callback(...args));
        }
    }
}
