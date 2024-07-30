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

    triggerEvent(event: string, data: any) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => callback(data));
        }
    }
}
