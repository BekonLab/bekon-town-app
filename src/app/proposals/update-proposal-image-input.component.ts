import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProposalImageModalComponent } from './update-proposal-image-modal.component';

@Component({
  selector: 'hd-update-proposal-image-input',
  template: `
    <input
      #fileInput
      class="hidden"
      (change)="onFileChange($event)"
      type="file"
      name="fileUrl"
      accept="image/jpeg, image/png, image/webp"
    />
  `,
  standalone: true,
})
export class UpdateProposalImageInputComponent {
  private readonly _matDialog = inject(MatDialog);

  @Input() proposalId: string | null = null;

  onFileChange(event: Event) {
    const reader = new FileReader();
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length) {
      const file = inputElement.files.item(0);

      if (file && this.proposalId) {
        reader.readAsDataURL(file);

        reader.onload = () => {
          this._matDialog.open(UpdateProposalImageModalComponent, {
            data: {
              imageSource: reader.result as string,
              fileSource: file,
              proposalId: this.proposalId,
            },
          });
        };
      }
    }
  }
}
