import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  CreateProposalPayload,
  ProposalApiService,
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
 * This directive gives the ability to create a proposal.
 */
@Directive({
  selector: '[hdCreateProposalAction]',
  standalone: true,
  exportAs: 'createProposalAction',
})
export class CreateProposalActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdCreateProposalStarts = new EventEmitter();
  @Output() hdCreateProposalSuccess = new EventEmitter();
  @Output() hdCreateProposalError = new EventEmitter<string>();
  @Output() hdCreateProposalEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method creates a new proposal
   *
   * @param payload Payload used to create the new proposal.
   */
  async run(payload: CreateProposalPayload) {
    this.patchState({ isRunning: true });
    this.hdCreateProposalStarts.emit();

    try {
      await this._proposalApiService.create(payload);

      this.hdCreateProposalSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdCreateProposalError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdCreateProposalEnds.emit();
    }
  }
}
