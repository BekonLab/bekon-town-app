import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
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
 * This directive gives the ability to delete a proposal.
 */
@Directive({
  selector: '[hdDeleteProposalAction]',
  standalone: true,
  exportAs: 'deleteProposalAction',
})
export class DeleteProposalActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdDeleteProposalStarts = new EventEmitter();
  @Output() hdDeleteProposalSuccess = new EventEmitter();
  @Output() hdDeleteProposalError = new EventEmitter<string>();
  @Output() hdDeleteProposalEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method deletes a proposal
   */
  async run() {
    this.patchState({ isRunning: true });
    this.hdDeleteProposalStarts.emit();

    try {
      await this._proposalApiService.delete();
      this.hdDeleteProposalSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdDeleteProposalError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdDeleteProposalEnds.emit();
    }
  }
}
