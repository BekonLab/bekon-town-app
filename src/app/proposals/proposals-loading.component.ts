import { Component } from '@angular/core';
import { ProgressSpinnerComponent } from '../shared';

@Component({
  selector: 'hd-proposals-loading',
  template: `
    <div class="px-4 pb-8 pt-16">
      <div class="flex flex-col gap-8 items-center">
        <hd-progress-spinner progressSpinnerSize="lg"></hd-progress-spinner>
        <p class="text-center text-xl italic">Loading proposals...</p>
      </div>
    </div>
  `,
  styles: [],
  imports: [ProgressSpinnerComponent],
  standalone: true,
})
export class ProposalsLoadingComponent {}
