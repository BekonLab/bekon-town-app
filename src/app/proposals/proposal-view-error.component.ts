import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hd-proposal-view-error',
  template: `
    <div class="px-4 pb-8 pt-16">
      <div class="flex flex-col gap-8 justify-center">
        <mat-icon class="mx-auto scale-[3]">warning</mat-icon>
        <div>
          <p class="text-center text-xl italic">An Error just occured.</p>
          <p class="text-center text-red-500 font-bold italic mb-4">
            {{ error }}
          </p>
          <p class="text-center italic">
            Try again in a few minutes. If the error persist, reach out to the
            support team.
          </p>
        </div>
      </div>
    </div>
  `,
  imports: [MatIconModule],
  standalone: true,
})
export class ProposalViewErrorComponent {
  @Input() error: string | null = null;
}
