import { NgIf } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PushPipe } from '@ngrx/component';
import {
  ButtonDirective,
  IconButtonDirective,
  NotificationComponent,
} from '../shared';
import { UploadAndUpdateProposalImageActionDirective } from './upload-and-update-proposal-image-action.directive';

export interface UpdateProposalImageModalData {
  proposalId: string;
  imageSource: string;
  fileSource: File;
}

@Component({
  selector: 'hd-update-proposal-image-modal',
  template: `
    <div class="border-2 border-black">
      <header class="flex gap-4 items-center px-4 pt-4">
        <span class="grow uppercase"> Update Image </span>

        <button
          (click)="onClose()"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
          hdIconButton
          hdIconButtonSize="sm"
        >
          <mat-icon> close </mat-icon>
        </button>
      </header>

      <div class="p-4">
        <div class="px-12">
          <img
            *ngIf="
              data.fileSource &&
              data.fileSource !== null &&
              (data.fileSource.type === 'image/webp' ||
                data.fileSource.type === 'image/jpeg' ||
                data.fileSource.type === 'image/png')
            "
            class="object-contain w-48 h-48 mx-auto mb-4 border-2 border-black bg-[#CFDBE7]"
            [src]="data.imageSource"
          />
        </div>

        <div>
          <button
            hdButton
            (click)="onUploadAndUpdateProposalImage(data.fileSource)"
            [disabled]="(isRunning$ | ngrxPush) ?? false"
          >
            <span class="relative">
              Update image.

              <span *ngIf="isRunning$ | ngrxPush">
                <mat-spinner [diameter]="24"></mat-spinner>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    PushPipe,
    ButtonDirective,
    IconButtonDirective,
  ],
  hostDirectives: [
    {
      directive: UploadAndUpdateProposalImageActionDirective,
      outputs: [
        'hdUploadAndUpdateProposalImageStarts',
        'hdUploadAndUpdateProposalImageEnds',
        'hdUploadAndUpdateProposalImageSuccess',
        'hdUploadAndUpdateProposalImageError',
      ],
    },
  ],
})
export class UpdateProposalImageModalComponent {
  private readonly _matDialogRef = inject(
    MatDialogRef<UpdateProposalImageModalComponent>
  );
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _uploadAndUpdateProposalImageAction = inject(
    UploadAndUpdateProposalImageActionDirective
  );

  readonly data = inject<UpdateProposalImageModalData>(MAT_DIALOG_DATA);
  readonly isRunning$ = this._uploadAndUpdateProposalImageAction.isRunning$;

  @HostListener('hdUploadAndUpdateProposalImageStarts')
  onUploadAndUpdateProposalImageStarts() {
    this._matDialogRef.disableClose = true;
  }

  @HostListener('hdUploadAndUpdateProposalImageEnds')
  onUploadAndUpdateProposalImageEnds() {
    this._matDialogRef.disableClose = false;
  }

  @HostListener('hdUploadAndUpdateProposalImageSuccess')
  onUploadAndUpdateProposalImageSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Proposal image successfully updated.',
      duration: 3000,
    });

    this._matDialogRef.close();
  }

  @HostListener('hdUploadAndUpdateProposalImageError')
  onUploadAndUpdateProposalImageError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to update proposal image.',
      duration: 3000,
    });
  }

  onUploadAndUpdateProposalImage(file: File) {
    this._uploadAndUpdateProposalImageAction.run(file);
  }

  onClose() {
    this._matDialogRef.close();
  }
}
