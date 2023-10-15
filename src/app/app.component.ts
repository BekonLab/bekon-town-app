import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';
import {
  HdDisconnectWalletDirective,
  HdObscureAddressPipe,
  HdSelectAndConnectWalletDirective,
  HdWalletAdapterDirective,
  HdWalletIconComponent,
} from '@heavy-duty/wallet-adapter-cdk';
import { environment } from '../environments/environment';
import { IconButtonDirective, WalletModalTriggerDirective } from './shared';

@Component({
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HdObscureAddressPipe,
    HdWalletAdapterDirective,
    HdWalletIconComponent,
    HdDisconnectWalletDirective,
    HdSelectAndConnectWalletDirective,
    WalletModalTriggerDirective,
    IconButtonDirective,
  ],
  selector: 'hd-root',
  template: `
    <main>
      <mat-toolbar
        class="fixed z-20 top-0 border-b-2 border-black bg-[#F8FAFC]"
      >
        <div class="flex items-center gap-2 w-full">
          <img src="assets/logo.png" class="w-8 h-8" />

          <h1 class="bp-gothic-bold-regular-font">
            <a [routerLink]="['/']"> Bekon Town </a>
          </h1>

          <div class="grow"></div>

          <a [routerLink]="['/proposals']" class="hover:underline">
            Proposals
          </a>

          <div
            class="flex gap-2 items-center py-2 border-zinc-800 border-l-2 pl-2"
            *hdWalletAdapter="
              let wallet = wallet;
              let connected = connected;
              let publicKey = publicKey;
              let wallets = wallets
            "
          >
            <ng-container *ngIf="wallet && publicKey && connected">
              <hd-wallet-icon
                class="w-10 h-10"
                [hdWallet]="wallet"
              ></hd-wallet-icon>

              <h2 class="flex-grow">
                <span class="text-sm">Connected as</span>
                <span class="text-sm italic font-bold">
                  {{ publicKey.toBase58() | hdObscureAddress }}
                </span>
              </h2>

              <button
                hdIconButton
                hdIconButtonVariant="red"
                aria-label="Disconnect your wallet"
                hdDisconnectWallet
                #disconnectWallet="hdDisconnectWallet"
                (click)="disconnectWallet.run()"
              >
                <mat-icon> logout </mat-icon>
              </button>
            </ng-container>

            <ng-container *ngIf="!connected">
              <mat-icon>info</mat-icon>

              <h2>
                <span class="text-sm"> Not Connected </span>
              </h2>

              <button
                hdIconButton
                aria-label="Select and connect a wallet"
                hdWalletModalTrigger
                #walletModalTrigger="hdWalletModalTrigger"
                hdSelectAndConnectWallet
                #selectAndConnectWallet="hdSelectAndConnectWallet"
                (click)="walletModalTrigger.open(wallets)"
                (hdSelectWallet)="selectAndConnectWallet.run($event)"
              >
                <mat-icon> login </mat-icon>
              </button>
            </ng-container>
          </div>
        </div>
      </mat-toolbar>

      <div>
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  private readonly _connectionStore = inject(ConnectionStore);

  ngOnInit() {
    this._connectionStore.setEndpoint(environment.rpcEndpoint);
  }
}
