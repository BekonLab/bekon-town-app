import { Directive, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  PublishProposalModalComponent,
  PublishProposalModalData,
} from './publish-proposal-modal.component';

@Directive({
  selector: '[hdPublishProposalModalTrigger]',
  exportAs: 'publishProposalModalTrigger',
  standalone: true,
})
export class PublishProposalModalTriggerDirective {
  private readonly _matDialog = inject(MatDialog);

  open(data: PublishProposalModalData) {
    this._matDialog.open(PublishProposalModalComponent, { data });
  }
}
