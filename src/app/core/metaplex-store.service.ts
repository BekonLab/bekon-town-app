import { inject, Injectable } from '@angular/core';
import {
  AnchorWallet,
  ConnectionStore,
  WalletStore,
} from '@heavy-duty/wallet-adapter';
import {
  bundlrStorage,
  Metaplex,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import { ComponentStore } from '@ngrx/component-store';
import { Connection } from '@solana/web3.js';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

interface ViewModel {
  metaplex: Metaplex | null;
}

const initialState: ViewModel = {
  metaplex: null,
};

@Injectable()
export class MetaplexStore extends ComponentStore<ViewModel> {
  private readonly _connectionStore = inject(ConnectionStore);
  private readonly _walletStore = inject(WalletStore);

  readonly metaplex$ = this.select(({ metaplex }) => metaplex);

  readonly _setMetaplex = this.updater<{
    connection: Connection | null;
    anchorWallet: AnchorWallet | undefined;
  }>((state, { connection, anchorWallet }) => {
    if (connection === null || anchorWallet === undefined) {
      return {
        metaplex: null,
      };
    }

    const metaplex = new Metaplex(connection);

    metaplex.use(
      walletAdapterIdentity({
        ...anchorWallet,
        signMessage:
          'signMessage' in this._walletStore
            ? (message: Uint8Array) => {
                const signMessage$ = this._walletStore.signMessage(message);

                if (!signMessage$) {
                  throw new Error('Wallet cannot sign messages');
                }

                return firstValueFrom(signMessage$);
              }
            : undefined,
      })
    );

    metaplex.use(
      bundlrStorage(
        environment.production
          ? {}
          : {
              address: environment.storageEndpoint,
              providerUrl: environment.rpcEndpoint,
              timeout: 60000,
            }
      )
    );

    return {
      ...state,
      metaplex,
    };
  });

  constructor() {
    super(initialState);

    this._setMetaplex(
      this.select(
        this._connectionStore.connection$,
        this._walletStore.anchorWallet$,
        (connection, anchorWallet) => ({ connection, anchorWallet })
      )
    );
  }
}
