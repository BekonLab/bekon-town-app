import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { IconButtonDirective } from './icon-button.directive';

@Component({
  selector: 'hd-notification',
  template: `
    <div class="flex gap-4 items-center">
      <span class="flex-grow pl-2"> {{ message }} </span>
      <span matSnackBarActions>
        <button
          matSnackBarAction
          (click)="matSnackBarRef.dismissWithAction()"
          hdIconButton
          hdIconButtonSize="sm"
        >
          <mat-icon> close </mat-icon>
        </button>
      </span>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, IconButtonDirective],
})
export class NotificationComponent {
  readonly message = inject<string>(MAT_SNACK_BAR_DATA);
  readonly matSnackBarRef =
    inject<MatSnackBarRef<NotificationComponent>>(MatSnackBarRef);
}
