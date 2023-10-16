import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushPipe } from '@ngrx/component';
import {
  IconButtonDirective,
  NotificationComponent,
  ProgressSpinnerComponent,
} from '../shared';
import { DepositProposalActionDirective } from './deposit-proposal-action.directive';
import { DepositProposalFormComponent } from './deposit-proposal-form.component';
import { DepositProposalPayload } from './proposal-api.service';

export interface DepositProposalModalData {
  proposalId: string;
}

@Component({
  selector: 'hd-deposit-proposal-modal',
  template: `
    <div class="border-2 border-black">
      <header class="flex gap-4 items-center px-4 pt-4">
        <h2 class="grow">Support Proposal</h2>
        <button
          (click)="onClose()"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
          hdIconButton
          hdIconButtonSize="sm"
        >
          <mat-icon> close </mat-icon>
        </button>
      </header>

      <div class="p-4 min-w-[350px]">
        <hd-deposit-proposal-form
          (depositProposal)="onDepositProposal({
            proposalId: data.proposalId,
            amount: $event.amount,
          })"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
        ></hd-deposit-proposal-form>
      </div>

      <div
        *ngIf="isRunning$ | ngrxPush"
        class="absolute w-full h-full z-20 top-0 left-0 bg-white bg-opacity-80 flex justify-center items-center flex-col gap-4"
      >
        <hd-progress-spinner progressSpinnerSize="md"></hd-progress-spinner>
        <span> Processing deposit... </span>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    PushPipe,
    IconButtonDirective,
    DepositProposalFormComponent,
    ProgressSpinnerComponent,
  ],
  hostDirectives: [
    {
      directive: DepositProposalActionDirective,
      outputs: [
        'hdDepositProposalStarts',
        'hdDepositProposalEnds',
        'hdDepositProposalSuccess',
        'hdDepositProposalError',
      ],
    },
  ],
})
export class DepositProposalModalComponent {
  private readonly _matDialogRef = inject(
    MatDialogRef<DepositProposalModalComponent>
  );
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _depositProposalAction = inject(
    DepositProposalActionDirective
  );

  readonly data = inject<DepositProposalModalData>(MAT_DIALOG_DATA);
  readonly isRunning$ = this._depositProposalAction.isRunning$;

  @HostListener('hdDepositProposalStarts') onDepositProposalStarts() {
    this._matDialogRef.disableClose = true;
  }

  @HostListener('hdDepositProposalEnds') onDepositProposalEnds() {
    this._matDialogRef.disableClose = false;
  }

  @HostListener('hdDepositProposalSuccess') onDepositProposalSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Deposit successfully sent.',
      duration: 3000,
    });
    this._matDialogRef.close(true);
  }

  @HostListener('hdDepositProposalError') onDepositProposalError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to deposit.',
      duration: 3000,
    });
  }

  onDepositProposal(payload: DepositProposalPayload) {
    this._depositProposalAction.run(payload);
  }

  onClose() {
    this._matDialogRef.close(false);
  }
}
