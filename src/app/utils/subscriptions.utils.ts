import { Subscription } from "rxjs";

export class SubscriptionHandler {
    private subscriptions: Subscription[];

    constructor() {
        this.subscriptions = [];
    }

    reg(subscription: Subscription): void {
        this.subscriptions.push(subscription);
    }

    unsubscribe() {
        this.subscriptions.forEach(subscription => subscription?.unsubscribe());
    }
}