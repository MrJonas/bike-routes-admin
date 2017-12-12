import {Directive, ElementRef, Input, HostListener} from '@angular/core';


@Directive({
    selector: '[stickyHeader]'
})
export class StickHeaderDirective {

    private _minY: number = 80;
    private _className: string = 'nav-up';
    @Input('isCollapsed') isCollapsed;

    lastScroollPossition = 0;

    constructor(private _element: ElementRef) {}

    @HostListener('window:scroll', ['$event'])
    handleScrollEvent(e) {

        let width = window.screen.width;

        if (width < 768 && window.pageYOffset > this._minY && this.lastScroollPossition < window.pageYOffset && this.isCollapsed ) {
            this._element.nativeElement.classList.add(this._className);
        } else {
            this._element.nativeElement.classList.remove(this._className);
        }

        this.lastScroollPossition = window.pageYOffset;
    }
}