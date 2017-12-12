import { Component, Input, ViewChild , EventEmitter, Output} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import template from "./create.new.modal.view.html";

@Component({
    selector: 'dm-create-new-route',
    template
})
export class CreateNewModalComponent {

    @ViewChild('childModal') public childModal:ModalDirective;
    @Output('create') public create = new EventEmitter<any>();
    
    name: string;

    constructor( ) {}

    ngOnInit() {}

    public showModal():void {
        console.log('show');
        this.childModal.show();
    }

    public hideModal():void {
        this.childModal.hide();
    }

    public createNew() {
       this.create.emit(this.name);
       this.hideModal();
    }
}