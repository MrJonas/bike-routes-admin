import { Injectable } from '@angular/core';

@Injectable()
export class RouteListStateService {

    private _scrollHeight = 0;

    constructor(){}

    getScrollHeight() {
        return this._scrollHeight;
    }

    setScrollHeight(value) {
        this._scrollHeight = value;
    }
}
