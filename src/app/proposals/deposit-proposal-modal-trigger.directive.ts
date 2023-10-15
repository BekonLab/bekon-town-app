import { Directive, EventEmitter, Output, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  DepositProposalModalComponent,
  DepositProposalModalData,
} from './deposit-proposal-modal.component';

@Directive({
  selector: '[hdDepositProposalModalTrigger]',
  exportAs: 'depositProposalModalTrigger',
  standalone: true,
})
export class DepositProposalModalTriggerDirective {
  private readonly _matDialog = inject(MatDialog);
  private _matRef: MatDialogRef<DepositProposalModalComponent> | null = null;

  @Output() deposited = new EventEmitter();

  open(data: DepositProposalModalData) {
    this._matRef = this._matDialog.open(DepositProposalModalComponent, {
      data,
    });

    this._matRef.afterClosed().subscribe((data) => {
      if (data) {
        this.deposited.emit();
      }
    });
  }
}
