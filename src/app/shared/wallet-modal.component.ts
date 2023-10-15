import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Wallet } from '@heavy-duty/wallet-adapter';
import { HdWalletIconComponent } from '@heavy-duty/wallet-adapter-cdk';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { ButtonDirective } from './button.directive';
import { IconButtonDirective } from './icon-button.directive';

@Component({
  selector: 'hd-wallet-modal',
  template: `
    <ng-container *ngIf="installedWallets.length > 0">
      <div class="border-2 border-black">
        <header class="flex gap-4 items-center m-4">
          <h2 class="grow">Connect a wallet on Solana to continue</h2>
          <button
            (click)="onClose()"
            hdIconButton
            hdIconButtonClass="h-12 w-12 relative scale-[0.65]"
            aria-label="Close wallet adapter selection"
          >
            <mat-icon> close </mat-icon>
          </button>
        </header>

        <ul class="mx-4 mb-4">
          <li
            *ngFor="let wallet of installedWallets"
            [value]="wallet.adapter.name"
            class="mb-[-2px]"
          >
            <button
              hdButton
              hdButtonClass="w-full flex gap-2 items-center"
              hdButtonSize="lg"
              (click)="onSelectionChange(wallet.adapter.name)"
            >
              <hd-wallet-icon
                class="w-8 h-8"
                [hdWallet]="wallet"
              ></hd-wallet-icon>

              <span>{{ wallet.adapter.name }}</span>
            </button>
          </li>

          <ng-container *ngIf="expanded">
            <li
              *ngFor="let wallet of otherWallets"
              [value]="wallet.adapter.name"
              class="mb-[-2px]"
            >
              <button
                hdButton
                hdButtonClass="w-full flex gap-2 items-center"
                hdButtonSize="lg"
                (click)="onSelectionChange(wallet.adapter.name)"
              >
                <hd-wallet-icon
                  class="w-8 h-8"
                  [hdWallet]="wallet"
                ></hd-wallet-icon>

                <span>{{ wallet.adapter.name }}</span>
              </button>
            </li>
          </ng-container>
        </ul>

        <div class="mx-4 mb-4 flex justify-end">
          <button
            *ngIf="otherWallets.length > 0"
            (click)="onToggleExpand()"
            hdButton
            hdButtonClass="flex items-center gap-2"
          >
            <span>
              {{ expanded ? 'Less options' : 'More options' }}
            </span>
            <mat-icon
              class="transform transition-all duration-500 ease-in-out"
              [ngClass]="{
                'rotate-180': expanded
              }"
            >
              expand_more
            </mat-icon>
          </button>
        </div>
      </div>
    </ng-container>

    <ng-container *ngIf="installedWallets.length === 0">
      <div class="border-2 border-black">
        <header class="flex gap-4 items-center m-4">
          <h2 class="grow">You'll need a wallet on Solana to continue</h2>
          <button
            (click)="onClose()"
            hdIconButton
            hdIconButtonSize="sm"
            aria-label="Close wallet adapter selection"
          >
            <mat-icon> close </mat-icon>
          </button>
        </header>

        <div class="flex justify-center gap-2 mb-4">
          <button (click)="onGettingStarted()" hdButton>Get started</button>
        </div>

        <ul class="mx-4 mb-4" *ngIf="expanded">
          <li
            *ngFor="let wallet of otherWallets"
            [value]="wallet.adapter.name"
            class="mb-[-2px]"
          >
            <button
              hdButton
              hdButtonClass="w-full flex gap-2 items-center"
              hdButtonSize="lg"
              (click)="onSelectionChange(wallet.adapter.name)"
            >
              <hd-wallet-icon
                class="w-8 h-8"
                [hdWallet]="wallet"
              ></hd-wallet-icon>

              <span>{{ wallet.adapter.name }}</span>
            </button>
          </li>
        </ul>

        <div class="mx-4 mb-4 flex justify-end">
          <button
            *ngIf="otherWallets.length > 0"
            (click)="onToggleExpand()"
            hdButton
            hdButtonClass="flex items-center gap-2"
          >
            <span>
              {{
                expanded
                  ? 'Hide options'
                  : 'Already have a wallet? View options'
              }}
            </span>
            <mat-icon
              class="transform transition-all duration-500 ease-in-out"
              [ngClass]="{
                'rotate-180': expanded
              }"
            >
              expand_more
            </mat-icon>
          </button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .getting-started {
        display: block;
        margin: 2rem auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    MatIconModule,
    HdWalletIconComponent,
    ButtonDirective,
    IconButtonDirective,
  ],
})
export class WalletModalComponent {
  private readonly _dialogRef =
    inject<MatDialogRef<WalletModalComponent, WalletName>>(MatDialogRef);
  private readonly _data = inject<{ wallets: Wallet[] }>(MAT_DIALOG_DATA);

  expanded = false;
  readonly installedWallets = this._data.wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed
  );
  readonly otherWallets = [
    ...this._data.wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.Loadable
    ),
    ...this._data.wallets.filter(
      (wallet) => wallet.readyState === WalletReadyState.NotDetected
    ),
  ];
  readonly getStartedWallet = this.installedWallets.length
    ? this.installedWallets[0]
    : this._data.wallets.find(
        (wallet: { adapter: { name: WalletName } }) =>
          wallet.adapter.name === 'Phantom'
      ) ||
      this._data.wallets.find(
        (wallet: { adapter: { name: WalletName } }) =>
          wallet.adapter.name === 'Backpack'
      ) ||
      this._data.wallets.find(
        (wallet: { readyState: WalletReadyState }) =>
          wallet.readyState === WalletReadyState.Loadable
      ) ||
      this.otherWallets[0];

  onSelectionChange(walletName: WalletName): void {
    this._dialogRef.close(walletName);
  }

  onGettingStarted(): void {
    this._dialogRef.close(this.getStartedWallet.adapter.name);
  }

  onClose(): void {
    this._dialogRef.close();
  }

  onToggleExpand(): void {
    this.expanded = !this.expanded;
  }
}
