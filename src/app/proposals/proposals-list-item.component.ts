import { DecimalPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ToUserValuePipe } from '../shared';
import { Proposal } from './proposal';

@Component({
  selector: 'hd-proposals-list-item',
  template: `
    <a
      *ngIf="proposal"
      [routerLink]="[proposal.ownerPubkey, 'view', proposal.id]"
      hdButton
      hdButtonClass="block"
      hdButtonSize="lg"
    >
      <img
        class="w-full h-40 object-cover mb-2"
        [src]="proposal.imageUrl"
        alt=""
      />

      <h3 class="text-2xl truncate mb-2">{{ proposal.name }}</h3>

      <div class="flex items-center gap-2 mb-4">
        <img src="assets/usdc-logo.png" class="w-6 h-6" />

        <p class="text-xl">
          <ng-container
            *ngIf="proposal.vaultAmount !== undefined; else amountUndefined"
          >
            {{ proposal.vaultAmount | hdToUserValue : 6 | number : '2.2-2' }}
          </ng-container>

          <ng-template #amountUndefined> - </ng-template>
        </p>
      </div>

      <p>{{ proposal.description }}</p>
    </a>
  `,
  imports: [NgIf, DecimalPipe, RouterLink, ToUserValuePipe, ButtonDirective],
  standalone: true,
})
export class ProposalsListItemComponent {
  @Input() proposal: Proposal | null = null;
}
