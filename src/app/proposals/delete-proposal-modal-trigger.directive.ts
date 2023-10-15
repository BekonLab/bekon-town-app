import { Directive, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DeleteProposalModalComponent,
  DeleteProposalModalData,
} from './delete-proposal-modal.component';

@Directive({
  selector: '[hdDeleteProposalModalTrigger]',
  exportAs: 'deleteProposalModalTrigger',
  standalone: true,
})
export class DeleteProposalModalTriggerDirective {
  private readonly _matDialog = inject(MatDialog);

  open(data: DeleteProposalModalData) {
    this._matDialog.open(DeleteProposalModalComponent, { data });
  }
}
