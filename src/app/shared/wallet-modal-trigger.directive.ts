import { Directive, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Wallet } from '@heavy-duty/wallet-adapter';
import { ComponentStore } from '@ngrx/component-store';
import { WalletName } from '@solana/wallet-adapter-base';
import { exhaustMap, tap } from 'rxjs';
import { WalletModalComponent } from './wallet-modal.component';

interface ViewModel {
  isOpen: boolean;
}

const initialState: ViewModel = {
  isOpen: false,
};

@Directive({
  selector: '[hdWalletModalTrigger]',
  standalone: true,
  exportAs: 'hdWalletModalTrigger',
})
export class WalletModalTriggerDirective extends ComponentStore<ViewModel> {
  private readonly _matDialog = inject(MatDialog);

  @Input() hdPanelClass = '';
  @Output() hdSelectWallet = new EventEmitter<WalletName>();

  private readonly _handleOpen = this.effect<Wallet[]>(
    exhaustMap((wallets) => {
      this.patchState({ isOpen: true });

      return this._matDialog
        .open<WalletModalComponent, { wallets: Wallet[] }, WalletName>(
          WalletModalComponent,
          {
            panelClass: [...this.hdPanelClass.split(' ')],
            maxWidth: '380px',
            maxHeight: '90vh',
            data: {
              wallets,
            },
          }
        )
        .afterClosed()
        .pipe(
          tap((walletName) => {
            if (walletName) {
              this.hdSelectWallet.emit(walletName);
            }
            this.patchState({ isOpen: false });
          })
        );
    })
  );

  constructor() {
    super(initialState);
  }

  open(wallets: Wallet[]) {
    this._handleOpen(wallets);
  }
}
