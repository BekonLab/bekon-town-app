import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { BehaviorSubject } from 'rxjs';
import { ButtonDirective, IconButtonDirective } from '../shared';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    LetDirective,
    PushPipe,
    ButtonDirective,
    IconButtonDirective,
  ],
  selector: 'hd-proposal-settings-side-nav',
  template: `
    <mat-sidenav-container *ngrxLet="mobileQuery$; let mobileQuery">
      <mat-sidenav
        #sideNav
        [mode]="mobileQuery.matches ? 'over' : 'side'"
        [opened]="!mobileQuery.matches || (isOpen$ | ngrxPush)"
        [fixedInViewport]="true"
        [fixedTopGap]="mobileQuery.matches ? 56 : 64"
        [disableClose]="!mobileQuery.matches"
        (closed)="onClose()"
        class="w-[240px]"
      >
        <div
          class="flex items-center gap-2 pl-2 pr-6 py-2 border-b-2 border-black"
        >
          <a hdIconButton hdIconButtonSize="sm" [routerLink]="['/proposals']">
            <mat-icon> arrow_back </mat-icon>
          </a>

          <p class="truncate text-lg">Settings</p>
        </div>

        <div>
          <a
            hdButton
            hdButtonClass="inline-block w-full mt-[-2px]"
            hdButtonSize="lg"
            [routerLink]="['general']"
            routerLinkActive="underline"
            (click)="onClose()"
          >
            General
          </a>
          <a
            hdButton
            hdButtonClass="inline-block w-full mt-[-2px]"
            hdButtonSize="lg"
            [routerLink]="['advanced']"
            routerLinkActive="underline"
            (click)="onClose()"
          >
            Advanced
          </a>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <div class="fixed bottom-4 left-4 z-10">
          <button
            *ngIf="mobileQuery?.matches"
            mat-fab
            (click)="onOpen()"
            color="accent"
          >
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [],
})
export class ProposalSettingsSideNavComponent {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _isOpen = new BehaviorSubject(false);

  readonly isOpen$ = this._isOpen.asObservable();
  readonly mobileQuery$ =
    this._breakpointObserver.observe('(max-width: 600px)');

  onOpen() {
    this._isOpen.next(true);
  }

  onClose() {
    this._isOpen.next(false);
  }
}
