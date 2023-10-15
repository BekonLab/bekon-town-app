import { Directive, EventEmitter, inject, Output } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  DepositProposalPayload,
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
 * This directive gives the ability to deposit a proposal.
 */
@Directive({
  selector: '[hdDepositProposalAction]',
  standalone: true,
  exportAs: 'depositProposalAction',
})
export class DepositProposalActionDirective extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);

  readonly isRunning$ = this.select(({ isRunning }) => isRunning);
  readonly error$ = this.select(({ error }) => error);

  @Output() hdDepositProposalStarts = new EventEmitter();
  @Output() hdDepositProposalSuccess = new EventEmitter();
  @Output() hdDepositProposalError = new EventEmitter<string>();
  @Output() hdDepositProposalEnds = new EventEmitter();

  constructor() {
    super(initialState);
  }

  /**
   * This method deposits a proposal
   */
  async run(payload: DepositProposalPayload) {
    this.patchState({ isRunning: true });
    this.hdDepositProposalStarts.emit();

    try {
      await this._proposalApiService.deposit(payload);
      this.hdDepositProposalSuccess.emit();
    } catch (err) {
      let error: string;

      if (typeof err === 'string') {
        error = err;
      } else {
        error = JSON.stringify(err);
      }

      this.patchState({ error });
      this.hdDepositProposalError.emit(error);
    } finally {
      this.patchState({ isRunning: false });
      this.hdDepositProposalEnds.emit();
    }
  }
}
