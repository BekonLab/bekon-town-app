import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { ProposalsListItemComponent } from './proposals-list-item.component';
import { ProposalsStore } from './proposals-store.service';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, PushPipe, ProposalsListItemComponent],
  selector: 'hd-proposals-list-page',
  template: `
    <ul
      class="grid grid-cols-4 gap-0"
      *ngIf="proposals$ | ngrxPush as proposals"
    >
      <li *ngFor="let proposal of proposals; trackBy: trackBy">
        <hd-proposals-list-item [proposal]="proposal"></hd-proposals-list-item>
      </li>
    </ul>
  `,
})
export class ProposalsListPageComponent {
  private readonly _proposalsStore = inject(ProposalsStore);

  readonly proposals$ = this._proposalsStore.proposals$;

  trackBy(_index: number, model: { id: string }): string {
    return model.id;
  }
}
