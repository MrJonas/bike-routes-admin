import { Component, Input, ViewChild , EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import template from "./publish.modal.view.html";

@Component({
    selector: 'dm-publish-route-modal',
    template
})
export class PublishRouteModalComponent {

    @ViewChild('childModal') public childModal:ModalDirective;
    @Output('publish') public publish = new EventEmitter<any>();

    constructor( ) {}

    ngOnInit() {}

    public showModal():void {
        this.childModal.show();
    }

    public hideModal():void {
        this.childModal.hide();
    }

    public emitPublishRoute() {
        this.publish.emit(true);
        this.hideModal();
    }
}