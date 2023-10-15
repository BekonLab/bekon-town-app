import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

const INPUT_BASE_CLASSES =
  'p-4 border-2 border-black placeholder:italic mb-1 bg-[#F8FAFC] focus:outline focus:outline-2 focus:outline-[#FFD541]';

@Directive({ selector: '[hdInput]', standalone: true })
export class InputDirective implements OnInit {
  readonly renderer2 = inject(Renderer2);
  readonly elementRef = inject(ElementRef);

  @HostBinding('class') class = INPUT_BASE_CLASSES;

  private _classes: string | null = null;
  @Input() set hdInputClass(classes: string) {
    this._classes = classes;
    this._render();
  }

  ngOnInit() {
    this._render();
  }

  private _render() {
    const classes = this._classes ?? '';

    this.renderer2.setAttribute(
      this.elementRef.nativeElement,
      'class',
      `${INPUT_BASE_CLASSES} ${classes}`
    );
  }
}
