import { Component } from '@angular/core';
import { ProgressSpinnerComponent } from '../shared';

@Component({
  selector: 'hd-proposal-view-loading',
  template: `
    <div class="px-4 pb-8 pt-16">
      <div class="flex flex-col gap-8 items-center">
        <hd-progress-spinner progressSpinnerSize="lg"></hd-progress-spinner>
        <p class="text-center text-xl italic">Loading proposal...</p>
      </div>
    </div>
  `,
  imports: [ProgressSpinnerComponent],
  standalone: true,
})
export class ProposalViewLoadingComponent {}
