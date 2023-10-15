import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  ProposalApiService,
  UpdateProposalImagePayload,
} from './proposal-api.service';

interface ViewModel {
  isRunning: boolean;
  error: string | null;
}

const initialState: ViewModel = {
  isRunning: false,
  error: null,
};

/**
 * This directive gives the ability to update the image of a proposal.
 */
@Directive({
  selector: '[hdUpdateProposalImageAction]',
  standalone: true,
  exportAs: 'updateProposalImageAction',
})
export class UpdateProposalImageActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdUpdateProposalImageStarts = new EventEmitter();
  @Output() hdUpdateProposalImageSuccess = new EventEmitter();
  @Output() hdUpdateProposalImageError = new EventEmitter<string>();
  @Output() hdUpdateProposalImageEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method updates the image of a proposal
   *
   * @param payload Payload used to update the image.
   */
  async run(payload: UpdateProposalImagePayload) {
    this.patchState({ isRunning: true });
    this.hdUpdateProposalImageStarts.emit();

    try {
      await this._proposalApiService.updateImage(payload);
      this.hdUpdateProposalImageSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdUpdateProposalImageError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdUpdateProposalImageEnds.emit();
    }
  }
}
