import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ButtonDirective,
  InputDirective,
  NotificationComponent,
  ProgressSpinnerComponent,
} from '../shared';
import { fromUserValue } from '../utils';

export interface DepositProposalFormModel {
  amount: number | null;
}

export interface DepositProposalFormPayload {
  amount: number;
}

@Component({
  selector: 'hd-deposit-proposal-form',
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <div class="w-full mb-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount *"
          [(ngModel)]="model.amount"
          #amountControl="ngModel"
          required
          min="0.01"
          hdInput
          hdInputClass="w-full mb-1"
        />
        <p
          class="text-red-500 text-sm"
          *ngIf="form.submitted && amountControl.errors?.['required']"
        >
          Amount is required.
        </p>
        <p
          class="text-red-500 text-sm"
          *ngIf="form.submitted && amountControl.errors?.['min']"
        >
          Amount should be one cent or more.
        </p>
      </div>

      <button type="submit" hdButton [disabled]="disabled">Deposit</button>
    </form>
  `,
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ButtonDirective,
    InputDirective,
    ProgressSpinnerComponent,
  ],
})
export class DepositProposalFormComponent {
  private readonly _matSnackBar = inject(MatSnackBar);

  @Input() model: DepositProposalFormModel = {
    amount: null,
  };
  @Input() disabled = false;
  @Output() depositProposal = new EventEmitter<DepositProposalFormPayload>();

  onSubmit(form: NgForm) {
    if (form.invalid || this.model.amount === null) {
      this._matSnackBar.openFromComponent(NotificationComponent, {
        data: 'Invalid data, review form entries.',
        duration: 3000,
      });
    } else {
      this.depositProposal.emit({
        amount: fromUserValue(this.model.amount, 6),
      });
    }
  }
}
