import { Component, OnDestroy } from '@angular/core';
import { SpinnerService } from '../spinner/spinner.service';
import { SubscriptionHandler } from '../utils/subscriptions.utils';
import { InfoPanelService } from './info-panel.service';
import { textToElements } from '../utils/text-format.utils';
import { Element } from '../utils/text-format.utils';

@Component({
	selector: 'app-info-panel',
	templateUrl: './info-panel.component.html',
	styleUrl: './info-panel.component.scss',
})
export class InfoPanelComponent implements OnDestroy {
	private subHandler = new SubscriptionHandler();
	filename?: string = undefined;
	loading: boolean = false;
	elements: Element[] = [];

	constructor(private infoPanelService: InfoPanelService, private spinnerService: SpinnerService) {
		this.subHandler.reg(
			this.infoPanelService.filename$.subscribe((filename) => {
				this.filename = filename.split('/').pop();
			})
		);

		this.subHandler.reg(
			this.infoPanelService.text$.subscribe((text) => {
				this.elements = textToElements(text);
			})
		);

		this.subHandler.reg(
			this.spinnerService.active$.subscribe((active) => {
				this.loading = active;
			})
		);
	}

	ngOnDestroy(): void {
		this.subHandler.unsubscribe();
	}

}
