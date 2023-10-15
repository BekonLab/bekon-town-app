import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [MatIconModule],
  selector: 'hd-proposal-view-not-found',
  template: `
    <div class="px-4 pb-8 pt-16">
      <div class="flex flex-col gap-8 justify-center">
        <mat-icon class="mx-auto scale-[3]">search</mat-icon>
        <p class="text-center text-xl italic">Proposal not found.</p>
      </div>
    </div>
  `,
})
export class ProposalViewNotFoundComponent {}
