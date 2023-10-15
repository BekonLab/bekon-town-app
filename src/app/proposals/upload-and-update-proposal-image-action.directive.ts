import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { convertBase64 } from '../utils';
import { ProposalApiService } from './proposal-api.service';

interface ViewModel {
  isRunning: boolean;
  error: string | null;
}

const initialState: ViewModel = {
  isRunning: false,
  error: null,
};

/**
 * This directive gives the ability to upload and update a proposal image.
 */
@Directive({
  selector: '[hdUploadAndUpdateProposalImageAction]',
  standalone: true,
  exportAs: 'uploadAndUpdateProposalImageAction',
})
export class UploadAndUpdateProposalImageActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdUploadAndUpdateProposalImageStarts = new EventEmitter();
  @Output() hdUploadAndUpdateProposalImageEnds = new EventEmitter();
  @Output() hdUploadAndUpdateProposalImageSuccess = new EventEmitter<string>();
  @Output() hdUploadAndUpdateProposalImageError = new EventEmitter<string>();

  constructor() {
    super(initialState);
  }

  /**
   * This method uploads an image and updates the proposal image.
   *
   * @param file File content that's going to be uploaded
   */
  async run(file: File) {
    this.patchState({ isRunning: true, error: null });
    this.hdUploadAndUpdateProposalImageStarts.emit();

    try {
      const imageBase64 = await convertBase64(file);

      await this._proposalApiService.updateImage({
        imageBase64,
      });

      this.hdUploadAndUpdateProposalImageSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdUploadAndUpdateProposalImageError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdUploadAndUpdateProposalImageEnds.emit();
    }
  }
}
