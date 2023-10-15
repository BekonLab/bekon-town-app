import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideComponentStore } from '@ngrx/component-store';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { appRoutes } from './app.routes';
import { MetaplexStore, TenderStore } from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    importProvidersFrom([MatDialogModule, MatSnackBarModule]),
    provideWalletAdapter({
      adapters: [
        new BackpackWalletAdapter(),
        new PhantomWalletAdapter(),
        new GlowWalletAdapter(),
      ],
    }),
    provideComponentStore(MetaplexStore),
    provideComponentStore(TenderStore),
  ],
};
