import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import {
  ButtonDirective,
  IconButtonDirective,
  NotificationComponent,
  ProgressSpinnerComponent,
} from '../shared';
import { PublishProposalActionDirective } from './publish-proposal-action.directive';

export interface PublishProposalModalData {
  id: string;
  name: string;
  description: string;
  ownerPubkey: string;
  imageBase64?: string;
}

@Component({
  selector: 'hd-publish-proposal-modal',
  template: `
    <div class="border-2 border-black relative p-4">
      <header class="flex gap-4 items-center mb-2">
        <h2 class="grow">Publish Proposal</h2>

        <button
          (click)="onClose()"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
          hdIconButton
          hdIconButtonSize="sm"
        >
          <mat-icon> close </mat-icon>
        </button>
      </header>

      <div
        class="p-2 w-full border-2 border-black flex gap-2 mb-2 bg-[#F0F3F5]"
      >
        <img
          class="w-32 h-32 border-2 border-black object-cover"
          [src]="data.imageBase64"
        />
        <div class="flex-grow">
          <p>{{ data.name }}</p>
          <p class="text-xs">{{ data.description }}</p>
        </div>
      </div>

      <p>
        Are you sure you want to
        <span class="italic">publish</span> this proposal?
      </p>
      <p class="text-xs italic mb-4">This action cannot be reverted</p>

      <div>
        <button
          hdButton
          hdButtonClass="flex gap-2"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
          (click)="onPublishProposal()"
        >
          <mat-icon>publish</mat-icon>
          Yes, publish it
        </button>
      </div>

      <div
        *ngIf="isRunning$ | ngrxPush"
        class="absolute w-full h-full z-20 top-0 left-0 bg-white bg-opacity-80 flex justify-center items-center flex-col gap-4"
      >
        <hd-progress-spinner progressSpinnerSize="md"></hd-progress-spinner>
        <span> Publishing proposal... </span>
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
    ProgressSpinnerComponent,
  ],
  hostDirectives: [
    {
      directive: PublishProposalActionDirective,
      outputs: [
        'hdPublishProposalStarts',
        'hdPublishProposalEnds',
        'hdPublishProposalSuccess',
        'hdPublishProposalError',
      ],
    },
  ],
})
export class PublishProposalModalComponent {
  private readonly _router = inject(Router);
  private readonly _matDialogRef = inject(
    MatDialogRef<PublishProposalModalComponent>
  );
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _publishProposalAction = inject(
    PublishProposalActionDirective
  );

  readonly data = inject<PublishProposalModalData>(MAT_DIALOG_DATA);
  readonly isRunning$ = this._publishProposalAction.isRunning$;

  @HostListener('hdPublishProposalStarts') onPublishProposalStarts() {
    this._matDialogRef.disableClose = true;
  }

  @HostListener('hdPublishProposalEnds') onPublishProposalEnds() {
    this._matDialogRef.disableClose = false;
  }

  @HostListener('hdPublishProposalSuccess') onPublishProposalSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Proposal successfully published.',
      duration: 3000,
    });
    this._matDialogRef.close();
    this._router.navigate(['/proposals', 'view', this.data.id]);
  }

  @HostListener('hdPublishProposalError') onPublishProposalError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to publish proposal.',
      duration: 3000,
    });
  }

  onPublishProposal() {
    this._publishProposalAction.run();
  }

  onClose() {
    this._matDialogRef.close();
  }
}
