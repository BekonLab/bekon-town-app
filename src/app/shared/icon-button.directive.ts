import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

const VARIANTS = {
  primary: 'bg-white hover:bg-[#F8FAFC] focus:bg-[#F8FAFC]',
  green: 'bg-green-200 hover:bg-green-300 focus:bg-green-300',
  red: 'bg-red-200 hover:bg-red-300 focus:bg-red-300',
};

const SIZES = {
  sm: 'text-xs p-1 h-12 w-12 scale-[0.65]',
  md: 'p-2 h-12 w-12',
  lg: 'p-4',
};

const ICON_BUTTON_BASE_CLASSES =
  'relative border-2 border-black disabled:bg-white disabled:text-zinc-500 disabled:border-zinc-500 disabled:pointer-events-none hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_1px_black] transition duration-300 ease-in-out active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_black] focus:outline focus:outline-2 focus:outline-[#FFD541]';

@Directive({ selector: '[hdIconButton]', standalone: true })
export class IconButtonDirective implements OnInit, AfterContentInit {
  readonly renderer2 = inject(Renderer2);
  readonly elementRef = inject(ElementRef);

  @ContentChild(MatIcon, { read: ElementRef }) matIcon: ElementRef | null =
    null;

  @HostBinding('class') class = ICON_BUTTON_BASE_CLASSES;

  private _variant: keyof typeof VARIANTS = 'primary';
  @Input() set hdIconButtonVariant(variant: keyof typeof VARIANTS) {
    this._variant = variant;
    this._render();
  }

  private _size: keyof typeof SIZES = 'md';
  @Input() set hdIconButtonSize(size: keyof typeof SIZES) {
    this._size = size;
    this._render();
  }

  private _classes: string | null = null;
  @Input() set hdIconButtonClass(classes: string) {
    this._classes = classes;
    this._render();
  }

  ngOnInit() {
    this._render();
  }

  ngAfterContentInit() {
    const matIcon = this.matIcon;

    if (matIcon) {
      const iconClasses = [
        'absolute',
        'top-1/2',
        'left-1/2',
        'transform',
        '-translate-x-1/2',
        '-translate-y-1/2',
      ];

      iconClasses.forEach((iconClass) => {
        this.renderer2.addClass(matIcon.nativeElement, iconClass);
      });
    }
  }

  private _render() {
    const classes = this._classes ?? '';

    this.renderer2.setAttribute(
      this.elementRef.nativeElement,
      'class',
      `${ICON_BUTTON_BASE_CLASSES} ${VARIANTS[this._variant]} ${
        SIZES[this._size]
      } ${classes}`
    );
  }
}
