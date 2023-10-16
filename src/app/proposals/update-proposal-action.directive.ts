import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  ProposalApiService,
  UpdateProposalPayload,
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
 * This directive gives the ability to update a proposal.
 */
@Directive({
  selector: '[hdUpdateProposalAction]',
  standalone: true,
  exportAs: 'updateProposalAction',
})
export class UpdateProposalActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdUpdateProposalStarts = new EventEmitter();
  @Output() hdUpdateProposalSuccess = new EventEmitter();
  @Output() hdUpdateProposalError = new EventEmitter<string>();
  @Output() hdUpdateProposalEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method updates an existing proposal
   *
   * @param payload Payload used to update the proposal.
   */
  async run(payload: UpdateProposalPayload) {
    this.patchState({ isRunning: true });
    this.hdUpdateProposalStarts.emit();

    try {
      await this._proposalApiService.update(payload);
      this.hdUpdateProposalSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      console.error(err);
      this.patchState({ error });
      this.hdUpdateProposalError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdUpdateProposalEnds.emit();
    }
  }
}
