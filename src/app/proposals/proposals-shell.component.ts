import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { ButtonDirective, HeaderComponent } from '../shared';
import { CreateProposalModalTriggerDirective } from './create-proposal-modal-trigger.directive';
import { ProposalApiService } from './proposal-api.service';
import { ProposalsEmptyComponent } from './proposals-empty.component';
import { ProposalsErrorComponent } from './proposals-error.component';
import { ProposalsLoadingComponent } from './proposals-loading.component';
import { ProposalsStore } from './proposals-store.service';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    PushPipe,
    LetDirective,
    HeaderComponent,
    ButtonDirective,
    ProposalsLoadingComponent,
    ProposalsErrorComponent,
    ProposalsEmptyComponent,
    CreateProposalModalTriggerDirective,
  ],
  selector: 'hd-proposals-shell',
  template: `
    <div
      *ngrxLet="mobileQuery$; let mobileQuery"
      [ngClass]="{
        'min-h-[calc(100vh-56px)] mt-[56px]': mobileQuery.matches,
        'min-h-[calc(100vh-64px)] mt-[64px]': !mobileQuery.matches
      }"
    >
      <hd-header hdHeaderClass="px-8 py-16">
        <h2 class="text-7xl font-semibold mb-4">Proposals List</h2>

        <div *ngrxLet="pendingProposal$; let pendingProposal">
          <button
            *ngIf="!pendingProposal"
            hdButton
            hdCreateProposalModalTrigger
            #createProposalModalTrigger="createProposalModalTrigger"
            (click)="createProposalModalTrigger.open()"
          >
            Create Proposal
          </button>
          <a
            *ngIf="pendingProposal"
            hdButton
            hdButtonClass="inline-block"
            [routerLink]="['/proposals', 'settings']"
          >
            Update Proposal
          </a>
        </div>
      </hd-header>

      <ng-container *ngIf="!(isLoading$ | ngrxPush); else loadingTemplate">
        <ng-container *ngIf="!(error$ | ngrxPush); else errorTemplate">
          <ng-container *ngIf="proposals$ | ngrxPush as proposals">
            <ng-container *ngIf="proposals.length > 0; else emptyTemplate">
              <router-outlet></router-outlet>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-template #loadingTemplate>
        <hd-proposals-loading></hd-proposals-loading>
      </ng-template>

      <ng-template #errorTemplate>
        <hd-proposals-error
          [error]="(error$ | ngrxPush) ?? null"
        ></hd-proposals-error>
      </ng-template>

      <ng-template #emptyTemplate>
        <hd-proposals-empty></hd-proposals-empty>
      </ng-template>
    </div>
  `,
  providers: [provideComponentStore(ProposalsStore)],
})
export class ProposalsShellComponent {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _proposalsStore = inject(ProposalsStore);
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly pendingProposal$ = this._proposalApiService.pendingProposal$;
  readonly proposals$ = this._proposalsStore.proposals$;
  readonly isLoading$ = this._proposalsStore.isLoading$;
  readonly error$ = this._proposalsStore.error$;
  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');
}
