import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PushPipe } from '@ngrx/component';
import {
  ButtonDirective,
  IconButtonDirective,
  NotificationComponent,
} from '../shared';
import { DeleteProposalActionDirective } from './delete-proposal-action.directive';

export interface DeleteProposalModalData {
  name: string;
}

@Component({
  selector: 'hd-delete-proposal-modal',
  template: `
    <div class="border-2 border-black relative">
      <header class="flex gap-4 items-center px-4 pt-4 mb-2">
        <h2 class="grow">Delete Proposal</h2>

        <button
          (click)="onClose()"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
          hdIconButton
          hdIconButtonSize="sm"
        >
          <mat-icon> close </mat-icon>
        </button>
      </header>

      <div class="px-4 pb-4">
        <p>
          Are you sure you want to
          <span class="italic text-red-500">delete</span> this proposal?
        </p>
        <p class="text-xs italic mb-4">This action cannot be reverted</p>

        <div>
          <button
            hdButton
            hdButtonClass="flex gap-2"
            (click)="onDeleteProposal()"
          >
            <mat-icon>delete_forever</mat-icon>
            Yes, delete it
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    PushPipe,
    ButtonDirective,
    IconButtonDirective,
  ],
  hostDirectives: [
    {
      directive: DeleteProposalActionDirective,
      outputs: [
        'hdDeleteProposalStarts',
        'hdDeleteProposalEnds',
        'hdDeleteProposalSuccess',
        'hdDeleteProposalError',
      ],
    },
  ],
})
export class DeleteProposalModalComponent {
  private readonly _matDialogRef = inject(
    MatDialogRef<DeleteProposalModalComponent>
  );
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _deleteProposalAction = inject(
    DeleteProposalActionDirective
  );

  readonly data = inject<DeleteProposalModalData>(MAT_DIALOG_DATA);
  readonly isRunning$ = this._deleteProposalAction.isRunning$;

  @HostListener('hdDeleteProposalStarts') onDeleteProposalStarts() {
    this._matDialogRef.disableClose = true;
  }

  @HostListener('hdDeleteProposalEnds') onDeleteProposalEnds() {
    this._matDialogRef.disableClose = false;
  }

  @HostListener('hdDeleteProposalSuccess') onDeleteProposalSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Proposal successfully deleted.',
      duration: 3000,
    });
    this._matDialogRef.close();
  }

  @HostListener('hdDeleteProposalError') onDeleteProposalError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to delete proposal.',
      duration: 3000,
    });
  }

  onDeleteProposal() {
    this._deleteProposalAction.run();
  }

  onClose() {
    this._matDialogRef.close();
  }
}
