import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ProposalApiService } from './proposal-api.service';
import { ProposalSettingsNotFoundComponent } from './proposal-settings-not-found.component';
import { ProposalSettingsSideNavComponent } from './proposal-settings-side-nav.component';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterOutlet,
    PushPipe,
    LetDirective,
    ProposalSettingsSideNavComponent,
    ProposalSettingsNotFoundComponent,
  ],
  selector: 'hd-proposal-settings-shell',
  template: `
    <div
      *ngrxLet="mobileQuery$; let mobileQuery"
      [ngClass]="{
        'min-h-[calc(100vh-56px)] mt-[56px]': mobileQuery.matches,
        'min-h-[calc(100vh-64px)] mt-[64px]': !mobileQuery.matches
      }"
    >
      <ng-container *ngrxLet="pendingProposal$; let pendingProposal">
        <ng-container *ngIf="pendingProposal !== undefined">
          <ng-container *ngIf="pendingProposal !== null; else notFoundTemplate">
            <hd-proposal-settings-side-nav>
              <router-outlet></router-outlet>
            </hd-proposal-settings-side-nav>
          </ng-container>
        </ng-container>
      </ng-container>

      <ng-template #notFoundTemplate>
        <hd-proposal-settings-not-found></hd-proposal-settings-not-found>
      </ng-template>
    </div>
  `,
})
export class ProposalSettingsShellComponent {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly pendingProposal$ = this._proposalApiService.pendingProposal$;
  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');
}
