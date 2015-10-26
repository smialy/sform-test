import {Events} from 'sjs-event';
import {createField} from '../core/model/fields';


export class Canvas extends Events{
    constructor(app){
        super();
        this.fields = {};
        this.selected = null;
        app.on('add-field', this.onAddField, this);
    }
    onAddField(type){
        var field = createField(type);
        this.fields[field.sid] = field;
        this.dispatch('add-field', field);

    }
    removeField(sid){
        var field = this.fields[sid];
        delete this.fields[sid];
        this.dispatch('remove-field', field);
    }
    selectField(sid){
        if(this.selected){
            this.dispatch('unselect-field', this.selected);
        }
        this.selected = this.fields[sid];
        this.dispatch('select-field', this.selected);


    }
}
