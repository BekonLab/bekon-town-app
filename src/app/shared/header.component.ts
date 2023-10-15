import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'hd-header',
  template: `
    <header
      class="border-b-2 border-black bg-[#F0F3F5] relative overflow-hidden"
    >
      <div
        class="bg-[url('./assets/horizontal-pattern.png')] bg-repeat w-full h-full absolute z-0"
      ></div>
      <div
        class="bg-[url('./assets/vertical-pattern.png')] bg-repeat w-full h-full absolute z-0"
      ></div>

      <div class="z-10 relative">
        <div [class]="classes">
          <ng-content></ng-content>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  private _classes: string | null = null;
  @Input() set hdHeaderClass(classes: string) {
    this._classes = classes;
  }
  get classes() {
    return this._classes;
  }
}
