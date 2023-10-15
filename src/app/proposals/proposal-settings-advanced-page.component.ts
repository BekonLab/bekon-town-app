import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  HdSelectAndConnectWalletDirective,
  HdWalletAdapterDirective,
} from '@heavy-duty/wallet-adapter-cdk';
import { LetDirective, PushPipe } from '@ngrx/component';
import {
  ButtonDirective,
  HeaderComponent,
  WalletModalTriggerDirective,
} from '../shared';
import { DeleteProposalModalTriggerDirective } from './delete-proposal-modal-trigger.directive';
import { ProposalApiService } from './proposal-api.service';
import { PublishProposalModalTriggerDirective } from './publish-proposal-modal-trigger.directive';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    PushPipe,
    LetDirective,
    HdWalletAdapterDirective,
    HdSelectAndConnectWalletDirective,
    ButtonDirective,
    HeaderComponent,
    WalletModalTriggerDirective,
    DeleteProposalModalTriggerDirective,
    PublishProposalModalTriggerDirective,
  ],
  selector: 'hd-proposal-settings-advanced-page',
  template: `
    <hd-header hdHeaderClass="px-4 py-[4.5rem]">
      <h2 class="text-6xl">Advanced Settings</h2>
    </hd-header>

    <div class="border-b-2 border-black p-4">
      <h3 class="text-xl">Publish Proposal</h3>
    </div>

    <div class="p-4">
      <p class="mb-4">
        Once a proposal has been published it cannot be updated. Make sure to
        review before publishing.
      </p>

      <div
        *hdWalletAdapter="
          let connected = connected;
          let wallets = wallets;
          let publicKey = publicKey
        "
      >
        <button
          *ngIf="pendingProposal$ | ngrxPush as pendingProposal"
          hdButton
          hdButtonVariant="green"
          hdPublishProposalModalTrigger
          #publishProposalModalTrigger="publishProposalModalTrigger"
          hdWalletModalTrigger
          #walletModalTrigger="hdWalletModalTrigger"
          hdSelectAndConnectWallet
          #selectAndConnectWallet="hdSelectAndConnectWallet"
          (click)="
            connected && publicKey
              ? publishProposalModalTrigger.open({
                id: pendingProposal.id,
                name: pendingProposal.name,
                description: pendingProposal.description,
                ownerPubkey: publicKey.toBase58(),
                imageBase64: pendingProposal.imageBase64,
              })
              : walletModalTrigger.open(wallets)
          "
          (hdSelectWallet)="selectAndConnectWallet.run($event)"
          (hdWalletConnected)="
            publicKey && publishProposalModalTrigger.open({
              id: pendingProposal.id,
              name: pendingProposal.name,
              description: pendingProposal.description,
              ownerPubkey: publicKey.toBase58(),
              imageBase64: pendingProposal.imageBase64,
            })
          "
        >
          Publish Proposal
        </button>
      </div>
    </div>

    <div class="border-b-2 border-t-2 border-black p-4">
      <h3 class="text-xl">Delete Proposal</h3>
    </div>

    <div class="p-4">
      <p class="mb-4">
        Once a proposal is deleted we cannot restore it. This is a
        <span class="uppercase font-bold text-red-600">dangerous</span>
        action.
      </p>

      <button
        *ngIf="pendingProposal$ | ngrxPush as pendingProposal"
        hdButton
        hdButtonVariant="red"
        hdDeleteProposalModalTrigger
        #deleteProposalModalTrigger="deleteProposalModalTrigger"
        (click)="deleteProposalModalTrigger.open(pendingProposal)"
      >
        Delete Proposal
      </button>
    </div>
  `,
  styles: [],
})
export class ProposalSettingsAdvancedPageComponent {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly pendingProposal$ = this._proposalApiService.pendingProposal$;
}
