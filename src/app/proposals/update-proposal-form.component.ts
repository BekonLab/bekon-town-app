import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ButtonDirective,
  InputDirective,
  NotificationComponent,
} from '../shared';

export interface UpdateProposalFormModel {
  name: string;
  description: string;
}

export interface UpdateProposalFormPayload {
  name: string;
  description: string;
}

@Component({
  selector: 'hd-update-proposal-form',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <div></div>

      <div class="w-full mb-4">
        <input
          name="name"
          type="text"
          placeholder="Proposal Name"
          [(ngModel)]="model.name"
          #nameControl="ngModel"
          required
          maxlength="32"
          hdInput
          hdInputClass="w-full"
        />
        <p
          class="text-red-500 text-sm"
          *ngIf="form.submitted && nameControl.errors?.['required']"
        >
          Name is mandatory for the proposal.
        </p>
      </div>

      <div class="w-full mb-4">
        <textarea
          name="description"
          placeholder="Proposal Description"
          [(ngModel)]="model.description"
          #descriptionControl="ngModel"
          required
          maxlength="1000"
          rows="4"
          hdInput
          hdInputClass="w-full"
        ></textarea>
        <p
          *ngIf="form.submitted && descriptionControl.errors?.['required']"
          class="text-red-500 text-sm"
        >
          Description is mandatory for the proposal.
        </p>
      </div>

      <button type="submit" hdButton [disabled]="disabled">Save changes</button>
    </form>
  `,
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatProgressSpinnerModule,
    ButtonDirective,
    InputDirective,
  ],
})
export class UpdateProposalFormComponent {
  private readonly _matSnackBar = inject(MatSnackBar);

  @Input() model: UpdateProposalFormModel = {
    name: '',
    description: '',
  };
  @Input() disabled = false;
  @Output() updateProposal = new EventEmitter<UpdateProposalFormPayload>();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this._matSnackBar.openFromComponent(NotificationComponent, {
        data: 'Invalid data, review form entries.',
        duration: 3000,
      });
    } else {
      this.updateProposal.emit({
        name: this.model.name,
        description: this.model.description,
      });
    }
  }
}
