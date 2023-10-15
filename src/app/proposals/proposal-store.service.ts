import { inject, Injectable } from '@angular/core';
import { Program } from '@coral-xyz/anchor';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  BehaviorSubject,
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
import {
  FindOneProposalFilter,
  ProposalApiService,
} from './proposal-api.service';

interface ViewModel {
  proposal: Proposal | null | undefined;
  error: string | null;
  filters: FindOneProposalFilter | null;
  isLoading: boolean;
}

const initialState: ViewModel = {
  proposal: undefined,
  error: null,
  filters: null,
  isLoading: false,
};

const WAIT_BEFORE_LOADING_DISPLAY = 1_000;
const MINIMUM_LOADING_DISPLAY = 1_000;
const LOADING_TIMEOUT = 10_000;

@Injectable()
export class ProposalStore extends ComponentStore<ViewModel> {
  private readonly _proposalApiService = inject(ProposalApiService);
  private readonly _tenderStore = inject(TenderStore);
  private readonly _reload = new BehaviorSubject(null);

  readonly reload$ = this._reload.asObservable();
  readonly proposal$ = this.select(({ proposal }) => proposal);
  readonly filters$ = this.select(({ filters }) => filters);
  readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  readonly error$ = this.select(({ error }) => error);
  readonly isLoaded$ = this.select(
    this.proposal$,
    this.error$,
    (proposal, error) => ({
      proposal,
      error,
    })
  ).pipe(
    filter(({ proposal, error }) => error !== null || proposal !== undefined)
  );

  readonly setFilters = this.updater<FindOneProposalFilter | null>(
    (state, filters) => ({
      ...state,
      filters,
    })
  );

  private readonly _loadProposal = this.effect<{
    filters: FindOneProposalFilter | null;
    program: Program<Tender> | null;
  }>(
    switchMap(({ filters, program }) => {
      if (filters === null || program === null) {
        this.patchState({ proposal: undefined, error: null });
        return EMPTY;
      }

      return defer(() =>
        from(this._proposalApiService.findOne(program, filters))
      ).pipe(
        tapResponse(
          (proposal) => this.patchState({ proposal, error: null }),
          (error) => {
            if (typeof error === 'string') {
              this.patchState({ error, proposal: undefined });
            } else if (error instanceof Error) {
              this.patchState({ error: error.message, proposal: undefined });
            } else {
              this.patchState({ error: 'UnknownError', proposal: undefined });
            }
          }
        ),
        // Stop if there have been 10 seconds without any change
        takeUntil(timer(LOADING_TIMEOUT).pipe(takeUntil(this.isLoaded$)))
      );
    })
  );

  private readonly _loadIsLoading = this.effect<{
    filters: FindOneProposalFilter | null;
    program: Program<Tender> | null;
  }>(
    switchMap(({ filters, program }) => {
      if (filters === null || program === null) {
        return EMPTY;
      }

      return merge(
        // ON in 1second
        timer(WAIT_BEFORE_LOADING_DISPLAY).pipe(
          map(() => true),
          takeUntil(this.isLoaded$)
        ),

        // OFF once we receive a proposal, yet at least in 2s
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
              proposal: undefined,
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

    this._loadProposal(
      this.select(
        this._tenderStore.program$,
        this.filters$,
        this.reload$,
        (program, filters) => ({ program, filters })
      )
    );
    this._loadIsLoading(
      this.select(
        this._tenderStore.program$,
        this.filters$,
        this.reload$,
        (program, filters) => ({ program, filters })
      )
    );
  }

  reload() {
    this._reload.next(null);
  }
}
