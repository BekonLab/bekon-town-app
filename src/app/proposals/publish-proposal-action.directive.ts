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
 * This directive gives the ability to publish a proposal.
 */
@Directive({
  selector: '[hdPublishProposalAction]',
  standalone: true,
  exportAs: 'publishProposalAction',
})
export class PublishProposalActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdPublishProposalStarts = new EventEmitter();
  @Output() hdPublishProposalSuccess = new EventEmitter();
  @Output() hdPublishProposalError = new EventEmitter<string>();
  @Output() hdPublishProposalEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method publishs a proposal
   */
  async run() {
    this.patchState({ isRunning: true });
    this.hdPublishProposalStarts.emit();

    try {
      await this._proposalApiService.publish();
      await this._proposalApiService.delete();

      this.hdPublishProposalSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdPublishProposalError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdPublishProposalEnds.emit();
    }
  }
}
