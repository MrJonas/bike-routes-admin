import { Component, Input, ViewChild , EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import template from "./unpublish.modal.view.html";

@Component({
    selector: 'dm-unpublish-route-modal',
    template
})
export class UnpublishRouteModalComponent {

    @ViewChild('childModal') public childModal:ModalDirective;
    @Output('unpublish') public unpublish = new EventEmitter<any>();

    constructor( ) {}

    ngOnInit() {}

    public showModal():void {
        this.childModal.show();
    }

    public hideModal():void {
        this.childModal.hide();
    }

    public emitUnpublishRoute() {
        console.log('emit');
        this.unpublish.emit(true);
        this.hideModal();
    }
}