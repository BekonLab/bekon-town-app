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

export interface CreateProposalFormModel {
  name: string;
  description: string;
}

export interface CreateProposalFormPayload {
  name: string;
  description: string;
}

@Component({
  selector: 'hd-create-proposal-form',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)" class="w-[400px]">
      <div class="w-full mb-4">
        <input
          name="name"
          type="text"
          placeholder="Proposal name *"
          [(ngModel)]="model.name"
          #nameControl="ngModel"
          required
          maxlength="50"
          hdInput
          hdInputClass="w-full"
        />
        <p
          class="text-red-500 text-sm"
          *ngIf="form.submitted && nameControl.errors?.['required']"
        >
          Name is required.
        </p>
      </div>

      <div class="w-full mb-4">
        <textarea
          matInput
          name="description"
          placeholder="Proposal description *"
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
          Description is required.
        </p>
      </div>

      <button type="submit" hdButton [disabled]="disabled">
        Create Proposal
      </button>
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
export class CreateProposalFormComponent {
  private readonly _matSnackBar = inject(MatSnackBar);

  @Input() model: CreateProposalFormModel = {
    name: '',
    description: '',
  };
  @Input() disabled = false;
  @Output() createProposal = new EventEmitter<CreateProposalFormPayload>();

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this._matSnackBar.openFromComponent(NotificationComponent, {
        data: 'Invalid data, review form entries.',
        duration: 3000,
      });
    } else {
      this.createProposal.emit({
        name: this.model.name,
        description: this.model.description,
      });
    }
  }
}
