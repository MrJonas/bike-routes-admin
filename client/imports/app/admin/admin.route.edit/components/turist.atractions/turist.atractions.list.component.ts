import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormArray, FormControl} from '@angular/forms';
import { InjectUser } from "angular2-meteor-accounts-ui";

import template from './turist.atractions.list.view.html';
import style from './turist.atractions.list.style.scss';

import { MAKI_ICON_LIST } from './../assets/icons.constant';

@Component({
    selector: 'dm-turist-atractions-list',
    template,
    styles: [ style ]
})
@InjectUser("user")
export class TuristAtractionsListComponent {

    @Input('form') public form: FormGroup;

    ICONS = MAKI_ICON_LIST;

    centerLat;
    centerLng;
    zoom;
    path = [];

    private coordSelectingAtractionIndex;
    private coordSelectingAtractionName;

    constructor(private _fb: FormBuilder) {}

    ngOnInit() {
        this.setPath();
        this.zoom = parseInt(this.form.value.map_zoom) ||  13;
        this.centerLat = parseFloat(this.form.value.map_center_lat) || 54.70295;
        this.centerLng = parseFloat(this.form.value.map_center_lng) || 25.310127;
    }

    setPath() {
        try {
            this.path = JSON.parse(this.form.value.coordinates);
        } catch(err) {
            this.path = [];
        }
    }

    initMap () {}

    addNewAtraction() {
        const control = <FormArray>this.form.controls['atractions'];
        const addrCtrl = this.initAtraction();
        control.push(addrCtrl);
    }

    removeAtraction(i) {
        const control = <FormArray>this.form.controls['atractions'];
        control.removeAt(i);
    }

    initAtraction() {
        return this._fb.group({
            name: ['', Validators.required],
            description: [''],
            icon: [''],
            lat: [''],
            lng: [''],
            show_only_in_map: ['']
        });
    }

    pushUp(i) {
        const item1 = (<FormArray>this.form.controls['atractions']).at(i);
        const item2 = (<FormArray>this.form.controls['atractions']).at(i - 1);
        (<FormArray>this.form.controls['atractions']).setControl(i, item2);
        (<FormArray>this.form.controls['atractions']).setControl(i - 1, item1);
        this.form.markAsDirty();
    }

    pushDown(i) {
        const item1 = (<FormArray>this.form.controls['atractions']).at(i);
        const item2 = (<FormArray>this.form.controls['atractions']).at(i + 1);
        (<FormArray>this.form.controls['atractions']).setControl(i, item2);
        (<FormArray>this.form.controls['atractions']).setControl(i + 1, item1);
        this.form.markAsDirty();
    }

    initCoordinatesSelection(i) {
        this.coordSelectingAtractionIndex = i;
        this.coordSelectingAtractionName = this.form.value.atractions[i].name
    }

    cancelCoordinatesSelection() {
        this.coordSelectingAtractionIndex = null;
    }

    mapClicked($event: MouseEvent) {
        if(this.coordSelectingAtractionIndex != null) {
            let control = (<FormArray>this.form.controls['atractions']);
            (<FormGroup>control.controls[this.coordSelectingAtractionIndex]).controls['lat'].setValue($event.coords.lat);
            (<FormGroup>control.controls[this.coordSelectingAtractionIndex]).controls['lng'].setValue($event.coords.lng);
            this.form.markAsDirty();
        }
        this.cancelCoordinatesSelection();
    }

}