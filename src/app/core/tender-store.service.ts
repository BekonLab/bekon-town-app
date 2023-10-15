import { inject, Injectable } from '@angular/core';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import {
  AnchorWallet,
  ConnectionStore,
  WalletStore,
} from '@heavy-duty/wallet-adapter';
import { ComponentStore } from '@ngrx/component-store';
import { Connection, PublicKey } from '@solana/web3.js';
import { environment } from '../../environments/environment';
import { IDL, Tender } from './tender';

interface ViewModel {
  program: Program<Tender> | null;
  provider: AnchorProvider | null;
}

const initialState: ViewModel = {
  program: null,
  provider: null,
};

@Injectable()
export class TenderStore extends ComponentStore<ViewModel> {
  private readonly _connectionStore = inject(ConnectionStore);
  private readonly _walletStore = inject(WalletStore);

  readonly provider$ = this.select(({ provider }) => provider);
  readonly program$ = this.select(({ program }) => program);

  readonly _setProgram = this.updater<{
    connection: Connection | null;
    anchorWallet: AnchorWallet | undefined;
  }>((state, { connection, anchorWallet }) => {
    if (connection === null) {
      return {
        provider: null,
        program: null,
      };
    }

    if (anchorWallet === undefined) {
      const provider = new AnchorProvider(
        connection,
        {} as AnchorWallet,
        AnchorProvider.defaultOptions()
      );

      const program = new Program(
        IDL,
        new PublicKey(environment.programId),
        provider
      );

      return {
        provider: null,
        program,
      };
    }

    const provider = new AnchorProvider(
      connection,
      anchorWallet,
      AnchorProvider.defaultOptions()
    );
    const program = new Program(
      IDL,
      new PublicKey(environment.programId),
      provider
    );

    return {
      ...state,
      provider,
      program,
    };
  });

  constructor() {
    super(initialState);

    this._setProgram(
      this.select(
        this._connectionStore.connection$,
        this._walletStore.anchorWallet$,
        (connection, anchorWallet) => ({ connection, anchorWallet })
      )
    );
  }
}
