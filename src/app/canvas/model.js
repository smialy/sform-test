import {Events} from 'sjs-event';
import {createField} from '../core/model/fields';


export class Canvas extends Events{
    constructor(app){
        super();
        this.fields = {};
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
}
