import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';
import { ProposalStore } from './proposal-store.service';
import { ProposalViewErrorComponent } from './proposal-view-error.component';
import { ProposalViewLoadingComponent } from './proposal-view-loading.component';
import { ProposalViewNotFoundComponent } from './proposal-view-not-found.component';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterOutlet,
    PushPipe,
    LetDirective,
    ProposalViewLoadingComponent,
    ProposalViewErrorComponent,
    ProposalViewNotFoundComponent,
  ],
  selector: 'hd-proposal-view-shell',
  template: `
    <div
      *ngrxLet="mobileQuery$; let mobileQuery"
      [ngClass]="{
        'min-h-[calc(100vh-56px)] mt-[56px]': mobileQuery.matches,
        'min-h-[calc(100vh-64px)] mt-[64px]': !mobileQuery.matches
      }"
    >
      <ng-container *ngIf="!(isLoading$ | ngrxPush); else loadingTemplate">
        <ng-container *ngIf="!(error$ | ngrxPush); else errorTemplate">
          <ng-container *ngrxLet="proposal$; let proposal">
            <ng-container *ngIf="proposal !== undefined">
              <ng-container *ngIf="proposal !== null; else notFoundTemplate">
                <router-outlet></router-outlet>
              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-template #loadingTemplate>
        <hd-proposal-view-loading></hd-proposal-view-loading>
      </ng-template>

      <ng-template #errorTemplate>
        <hd-proposal-view-error
          [error]="(error$ | ngrxPush) ?? null"
        ></hd-proposal-view-error>
      </ng-template>

      <ng-template #notFoundTemplate>
        <hd-proposal-view-not-found></hd-proposal-view-not-found>
      </ng-template>
    </div>
  `,
  providers: [provideComponentStore(ProposalStore)],
})
export class ProposalViewShellComponent implements OnInit {
  private readonly _proposalStore = inject(ProposalStore);
  private readonly _activedRoute = inject(ActivatedRoute);
  private readonly _breakpointObserver = inject(BreakpointObserver);

  readonly proposal$ = this._proposalStore.proposal$;
  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');
  readonly isLoading$ = this._proposalStore.isLoading$;
  readonly error$ = this._proposalStore.error$;

  ngOnInit() {
    this._proposalStore.setFilters(
      this._activedRoute.paramMap.pipe(
        map((paramMap) => {
          const proposalId = paramMap.get('proposalId');
          const ownerPubkey = paramMap.get('ownerPubkey');

          if (proposalId === null || ownerPubkey === null) {
            return null;
          }

          return { name: 'filterById', id: proposalId, ownerPubkey };
        })
      )
    );
  }
}
