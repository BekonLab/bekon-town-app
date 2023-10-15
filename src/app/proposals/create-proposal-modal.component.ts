import { Component, HostListener, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { IconButtonDirective, NotificationComponent } from '../shared';
import { CreateProposalActionDirective } from './create-proposal-action.directive';
import { CreateProposalFormComponent } from './create-proposal-form.component';
import { CreateProposalPayload } from './proposal-api.service';

@Component({
  selector: 'hd-create-proposal-modal',
  template: `
    <div class="border-2 border-black relative">
      <header class="flex gap-4 items-center px-4 pt-4">
        <h2 class="grow">Create Proposal</h2>

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
        <hd-create-proposal-form
          (createProposal)="onCreateProposal($event)"
          [disabled]="(isRunning$ | ngrxPush) ?? false"
        ></hd-create-proposal-form>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    MatIconModule,
    PushPipe,
    IconButtonDirective,
    CreateProposalFormComponent,
  ],
  hostDirectives: [
    {
      directive: CreateProposalActionDirective,
      outputs: [
        'hdCreateProposalStarts',
        'hdCreateProposalEnds',
        'hdCreateProposalSuccess',
        'hdCreateProposalError',
      ],
    },
  ],
})
export class CreateProposalModalComponent {
  private readonly _matDialogRef = inject(
    MatDialogRef<CreateProposalModalComponent>
  );
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _createProposalAction = inject(
    CreateProposalActionDirective
  );
  private readonly _router = inject(Router);

  readonly isRunning$ = this._createProposalAction.isRunning$;

  @HostListener('hdCreateProposalStarts') onCreateProposalStarts() {
    this._matDialogRef.disableClose = true;
  }

  @HostListener('hdCreateProposalEnds') onCreateProposalEnds() {
    this._matDialogRef.disableClose = false;
  }

  @HostListener('hdCreateProposalSuccess') onCreateProposalSuccess() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Proposal successfully created.',
      duration: 3000,
    });
    this._matDialogRef.close();
    this._router.navigate(['/proposals', 'settings']);
  }

  @HostListener('hdCreateProposalError') onCreateProposalError() {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: 'Failed to create proposal.',
      duration: 3000,
    });
  }

  onCreateProposal(payload: CreateProposalPayload) {
    this._createProposalAction.run(payload);
  }

  onClose() {
    this._matDialogRef.close();
  }
}
