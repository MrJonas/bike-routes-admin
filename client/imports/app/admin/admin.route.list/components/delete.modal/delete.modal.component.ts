import { Component, Input, ViewChild , EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import template from "./delete.modal.view.html";

@Component({
    selector: 'dm-delete-route-modal',
    template
})
export class DeleteRouteModalComponent {

    @ViewChild('childModal') public childModal:ModalDirective;
    @Output('delete') public delete = new EventEmitter<any>();

    constructor( ) {}

    ngOnInit() {}

    public showModal():void {
        this.childModal.show();
    }

    public hideModal():void {
        this.childModal.hide();
    }

    public emitDeleteRoute() {
        this.delete.emit(true);
        this.hideModal();
    }
}