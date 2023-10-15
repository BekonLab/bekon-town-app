import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

const VARIANTS = {
  primary: 'bg-white hover:bg-[#F8FAFC] focus:bg-[#F8FAFC]',
  green: 'bg-green-200 hover:bg-green-300 focus:bg-green-300',
  red: 'bg-red-200 hover:bg-red-300 focus:bg-red-300',
};

const SIZES = {
  sm: 'text-xs px-2 py-1',
  md: 'px-2 py-1',
  lg: 'p-4',
};

const BUTTON_BASE_CLASSES =
  'border-2 border-black disabled:bg-white disabled:text-zinc-500 disabled:border-zinc-500 disabled:pointer-events-none hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_black] focus:outline focus:outline-2 focus:outline-[#FFD541]';

@Directive({ selector: '[hdButton]', standalone: true })
export class ButtonDirective implements OnInit {
  readonly renderer2 = inject(Renderer2);
  readonly elementRef = inject(ElementRef);

  @HostBinding('class') class = BUTTON_BASE_CLASSES;

  private _variant: keyof typeof VARIANTS = 'primary';
  @Input() set hdButtonVariant(variant: keyof typeof VARIANTS) {
    this._variant = variant;
    this._render();
  }

  private _size: keyof typeof SIZES = 'md';
  @Input() set hdButtonSize(size: keyof typeof SIZES) {
    this._size = size;
    this._render();
  }

  private _classes: string | null = null;
  @Input() set hdButtonClass(classes: string) {
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
      `${BUTTON_BASE_CLASSES} ${VARIANTS[this._variant]} ${
        SIZES[this._size]
      } ${classes}`
    );
  }
}
