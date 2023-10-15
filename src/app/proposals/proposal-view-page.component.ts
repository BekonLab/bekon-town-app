import { BreakpointObserver } from '@angular/cdk/layout';
import { DecimalPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {
  HdSelectAndConnectWalletDirective,
  HdWalletAdapterDirective,
} from '@heavy-duty/wallet-adapter-cdk';
import { LetDirective, PushPipe } from '@ngrx/component';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ButtonDirective,
  HeaderComponent,
  ToUserValuePipe,
  WalletModalTriggerDirective,
} from '../shared';
import { DepositProposalModalTriggerDirective } from './deposit-proposal-modal-trigger.directive';
import { ProposalStore } from './proposal-store.service';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    DecimalPipe,
    LetDirective,
    PushPipe,
    MatIconModule,
    HdWalletAdapterDirective,
    HdSelectAndConnectWalletDirective,
    ButtonDirective,
    HeaderComponent,
    ToUserValuePipe,
    WalletModalTriggerDirective,
    DepositProposalModalTriggerDirective,
  ],
  selector: 'hd-proposal-view-page',
  template: `
    <div
      *ngrxLet="mobileQuery$; let mobileQuery"
      [ngClass]="{
        'min-h-[calc(100vh-56px)] mt-[56px]': mobileQuery.matches,
        'min-h-[calc(100vh-64px)] mt-[64px]': !mobileQuery.matches
      }"
    >
      <ng-container *ngIf="proposal$ | ngrxPush as proposal">
        <hd-header hdHeaderClass="px-8 py-16">
          <div class="flex gap-4">
            <div class="flex-grow flex flex-col justify-center">
              <h2 class="text-7xl font-semibold mb-8">{{ proposal.name }}</h2>

              <div *ngIf="depositData$ | ngrxPush as depositData">
                <button
                  *hdWalletAdapter="
                    let connected = connected;
                    let wallets = wallets
                  "
                  hdButton
                  hdButtonClass="flex items-center gap-2"
                  hdDepositProposalModalTrigger
                  #depositProposalModalTrigger="depositProposalModalTrigger"
                  hdWalletModalTrigger
                  #walletModalTrigger="hdWalletModalTrigger"
                  hdSelectAndConnectWallet
                  #selectAndConnectWallet="hdSelectAndConnectWallet"
                  (click)="
                    connected
                      ? depositProposalModalTrigger.open(depositData)
                      : walletModalTrigger.open(wallets)
                  "
                  (hdSelectWallet)="selectAndConnectWallet.run($event)"
                  (hdWalletConnected)="
                    depositProposalModalTrigger.open(depositData)
                  "
                  (deposited)="onDeposited()"
                >
                  <mat-icon class="text-red-600">favorite</mat-icon>
                  <span> Support </span>
                </button>
              </div>
            </div>

            <img
              *ngIf="proposal?.imageUrl as imageUrl"
              [src]="imageUrl"
              class="object-contain w-56 h-56 border-2 border-black bg-[#CFDBE7]"
            />

            <div
              class="w-56 h-56 border-2 border-black bg-white flex flex-col justify-center gap-2"
            >
              <div class="flex justify-center items-center gap-2">
                <img src="assets/usdc-logo.png" class="w-12 h-12" />

                <p class="text-4xl">
                  <ng-container
                    *ngIf="
                      proposal.vaultAmount !== undefined;
                      else amountUndefined
                    "
                  >
                    {{
                      proposal.vaultAmount
                        | hdToUserValue : 6
                        | number : '2.2-2'
                    }}
                  </ng-container>

                  <ng-template #amountUndefined> - </ng-template>
                </p>
              </div>

              <p class="text-center">Given by the community</p>

              <div class="flex justify-center">
                <a
                  *ngIf="proposalVaultUrl$ | ngrxPush as proposalVaultUrl"
                  [href]="proposalVaultUrl"
                  target="_blank"
                  hdButton
                  hdButtonClass="flex items-center gap-2"
                >
                  <mat-icon>open_in_new</mat-icon>

                  <span> Inspect Vault </span>
                </a>
              </div>
            </div>
          </div>
        </hd-header>

        <div class="border-b-2 border-black p-4">
          <h3 class="text-xl">Description</h3>
        </div>

        <div class="p-4">
          <p class="mb-4">
            {{ proposal.description }}
          </p>

          <div class="flex">
            <a
              hdButton
              hdButtonClass="flex items-center gap-2"
              *ngIf="proposalMintUrl$ | ngrxPush as proposalMintUrl"
              [href]="proposalMintUrl"
              target="_blank"
              class="underline"
            >
              <mat-icon>open_in_new</mat-icon>

              <span> Inspect Proposal </span>
            </a>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class ProposalViewPageComponent {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _activedRoute = inject(ActivatedRoute);
  private readonly _proposalStore = inject(ProposalStore);

  readonly proposal$ = this._proposalStore.proposal$;
  readonly proposalVaultUrl$ = this.proposal$.pipe(
    map((proposal) => {
      if (!proposal) {
        return null;
      }

      return new URL(
        `https://explorer.solana.com/address/${
          proposal.vaultPubkey
        }?${new URLSearchParams({
          cluster: environment.cluster,
        }).toString()}`
      ).toString();
    })
  );
  readonly proposalMintUrl$ = this.proposal$.pipe(
    map((proposal) => {
      if (!proposal) {
        return null;
      }

      return new URL(
        `https://explorer.solana.com/address/${
          proposal.mintPubkey
        }?${new URLSearchParams({
          cluster: environment.cluster,
        }).toString()}`
      ).toString();
    })
  );
  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');
  readonly depositData$ = this._activedRoute.paramMap.pipe(
    map((paramMap) => {
      const proposalId = paramMap.get('proposalId');
      const ownerPubkey = paramMap.get('ownerPubkey');

      if (proposalId === null || ownerPubkey === null) {
        return null;
      }

      return { proposalId, ownerPubkey };
    })
  );

  onDeposited() {
    this._proposalStore.reload();
  }
}
