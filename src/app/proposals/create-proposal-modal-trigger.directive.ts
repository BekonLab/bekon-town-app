import { Directive, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProposalModalComponent } from './create-proposal-modal.component';

@Directive({
  selector: '[hdCreateProposalModalTrigger]',
  exportAs: 'createProposalModalTrigger',
  standalone: true,
})
export class CreateProposalModalTriggerDirective {
  private readonly _matDialog = inject(MatDialog);

  open() {
    this._matDialog.open(CreateProposalModalComponent);
  }
}
