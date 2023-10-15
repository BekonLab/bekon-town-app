import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type Size = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'hd-progress-spinner',
  template: `
    <div
      [ngClass]="{
        'w-4 h-4': progressSpinnerSize === 'xs',
        'w-8 h-8': progressSpinnerSize === 'sm',
        'w-12 h-12': progressSpinnerSize === 'md',
        'w-16 h-16': progressSpinnerSize === 'lg'
      }"
    >
      <span class="loader w-full h-full"></span>
    </div>
  `,
  styles: [
    `
      .loader {
        display: inline-block;
        position: relative;
        background: #000;
        box-sizing: border-box;
        animation: flipX 1s linear infinite;
      }

      @keyframes flipX {
        0% {
          transform: perspective(200px) rotateX(0deg) rotateY(0deg);
        }
        50% {
          transform: perspective(200px) rotateX(-180deg) rotateY(0deg);
        }
        100% {
          transform: perspective(200px) rotateX(-180deg) rotateY(-180deg);
        }
      }
    `,
  ],
  imports: [NgClass],
  standalone: true,
})
export class ProgressSpinnerComponent {
  @Input() progressSpinnerSize: Size = 'md';
}
