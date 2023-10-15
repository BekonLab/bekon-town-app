import { inject, Injectable } from '@angular/core';
import { Program } from '@coral-xyz/anchor';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  combineLatest,
  defer,
  distinctUntilChanged,
  EMPTY,
  filter,
  from,
  map,
  merge,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { TenderStore } from '../core';
import { Tender } from '../core/tender';
import { Proposal } from './proposal';
import { ProposalApiService } from './proposal-api.service';

interface ViewModel {
  proposals: Proposal[] | undefined;
  error: string | null;
  isLoading: boolean;
}

const initialState: ViewModel = {
  proposals: undefined,
  error: null,
  isLoading: false,
};

const WAIT_BEFORE_LOADING_DISPLAY = 1_000;
const MINIMUM_LOADING_DISPLAY = 1_000;
const LOADING_TIMEOUT = 10_000;

@Injectable()
export class ProposalsStore extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);
  private readonly _tenderStore = inject(TenderStore);

  readonly proposals$ = this.select(({ proposals }) => proposals);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly error$ = this.select(({ error }) => error);
  readonly isLoaded$ = this.select(
    this.proposals$,
    this.error$,
    (proposals, error) => ({
      proposals,
      error,
    })
  ).pipe(
    filter(({ proposals, error }) => error !== null || proposals !== undefined)
  );

  private readonly _loadProposals = this.effect<Program<Tender> | null>(
    switchMap((program) => {
      if (!program) {
        return EMPTY;
      }

      return defer(() => from(this._proposalApiService.find(program))).pipe(
        tapResponse(
          (proposals) => this.patchState({ proposals, error: null }),
          (error) => {
            if (typeof error === 'string') {
              this.patchState({ error, proposals: undefined });
            } else if (error instanceof Error) {
              this.patchState({ error: error.message, proposals: undefined });
            } else {
              this.patchState({ error: 'UnknownError', proposals: undefined });
            }
          }
        ),
        // Stop if there have been 10 seconds without any change
        takeUntil(timer(LOADING_TIMEOUT).pipe(takeUntil(this.isLoaded$)))
      );
    })
  );

  private readonly _loadIsLoading = this.effect<Program<Tender> | null>(
    switchMap((program) => {
      if (!program) {
        return EMPTY;
      }

      return merge(
        // ON in 1second
        timer(WAIT_BEFORE_LOADING_DISPLAY).pipe(
          map(() => true),
          takeUntil(this.isLoaded$)
        ),

        // OFF once we receive a proposals, yet at least in 2s
        combineLatest([
          this.isLoaded$,
          timer(WAIT_BEFORE_LOADING_DISPLAY + MINIMUM_LOADING_DISPLAY),
        ]).pipe(map(() => false)),

        // OFF after 10s
        timer(LOADING_TIMEOUT).pipe(
          map(() => false),
          tap(() =>
            this.patchState({
              error: 'TimeoutError',
              proposals: undefined,
            })
          ),
          takeUntil(this.isLoaded$)
        )
      ).pipe(
        startWith(false),
        distinctUntilChanged(),
        tap((isLoading) => this.patchState({ isLoading }))
      );
    })
  );

  constructor() {
    super(initialState);

    this._loadProposals(this._tenderStore.program$);
    this._loadIsLoading(this._tenderStore.program$);
  }
}
