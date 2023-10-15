import { NgClass, NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LetDirective, PushPipe } from '@ngrx/component';
import {
  HeaderComponent,
  IconButtonDirective,
  NotificationComponent,
} from '../shared';
import {
  ProposalApiService,
  UpdateProposalPayload,
} from './proposal-api.service';
import { UpdateProposalActionDirective } from './update-proposal-action.directive';
import { UpdateProposalFormComponent } from './update-proposal-form.component';
import { UpdateProposalImageInputComponent } from './update-proposal-image-input.component';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    MatIconModule,
    PushPipe,
    LetDirective,
    IconButtonDirective,
    HeaderComponent,
    UpdateProposalFormComponent,
    UpdateProposalImageInputComponent,
  ],
  selector: 'hd-proposal-settings-general-page',
  template: `
    <hd-header hdHeaderClass="p-4 flex gap-4 items-center">
      <h2 class="text-6xl flex-grow">General Settings</h2>

      <div class="flex items-center">
        <div class="relative w-48 h-48">
          <img
            *ngIf="(pendingProposal$ | ngrxPush)?.imageBase64 as imageBase64"
            [src]="imageBase64"
            class="object-contain w-48 h-48 border-2 border-black bg-[#CFDBE7]"
          />

          <div
            *ngIf="!(pendingProposal$ | ngrxPush)?.imageBase64"
            class="w-48 h-48 border-2 border-black bg-[#CFDBE7]"
          ></div>

          <div class="absolute bottom-4 right-4">
            <button hdIconButton (click)="updateProposalImageInput.click()">
              <mat-icon> edit </mat-icon>
            </button>
          </div>
        </div>

        <label #updateProposalImageInput>
          <hd-update-proposal-image-input
            [proposalId]="(pendingProposal$ | ngrxPush)?.id ?? null"
          ></hd-update-proposal-image-input>
        </label>
      </div>
    </hd-header>

    <div class="border-b-2 border-black px-4 py-4">
      <p class="text-xl">Basic Information</p>
    </div>

    <div class="p-4">
      <hd-update-proposal-form
        *ngIf="pendingProposal$ | ngrxPush as pendingProposal"
        [model]="{
                name: pendingProposal.name,
                description: pendingProposal.description,
              }"
        (updateProposal)="
              onUpdateProposal({
                name: $event.name,
                description: $event.description,
              })"
        [disabled]="(isRunning$ | ngrxPush) ?? false"
      >
      </hd-update-proposal-form>
    </div>
  `,
  styles: [],
  hostDirectives: [
    {
      directive: UpdateProposalActionDirective,
      outputs: ['hdUpdateProposalSuccess', 'hdUpdateProposalError'],
    },
  ],
})
export class ProposalSettingsGeneralPageComponent {
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _updateProposalAction = inject(
    UpdateProposalActionDirective
  );
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly pendingProposal$ = this._proposalApiService.pendingProposal$;
  readonly isRunning$ = this._updateProposalAction.isRunning$;

  @HostListener('hdUpdateProposalSuccess') onUpdateProposalSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Proposal updated successfully.',
      duration: 3000,
    });
  }

  @HostListener('hdUpdateProposalError') onUpdateProposalError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to update proposal.',
      duration: 3000,
    });
  }

  onUpdateProposal(payload: UpdateProposalPayload) {
    this._updateProposalAction.run(payload);
  }
}
