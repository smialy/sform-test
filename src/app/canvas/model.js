import {Events} from 'sjs-event';
import {createField} from '../core/model/fields';


export class Canvas extends Events{
    constructor(app){
        super();
        this.app = app;
        this.fields = {};
        this.selected = null;
        app.on('add-field', this.onAddField, this);
        app.on('update-field', this.onUpdateField, this);
    }
    onAddField(type){
        var field = createField(type);
        this.fields[field.sid] = field;
        this.dispatch('add-field', field);

    }
    onUpdateField(field, name, value){
        this.dispatch('update', field);
    }
    removeField(sid){
        var field = this.fields[sid];
        delete this.fields[sid];
        if(this.selected === field){
            this.selected = null;
        }
        this.dispatch('remove-field', field);
    }
    selectField(sid){
        if(this.selected){
            this.dispatch('unselect-field', this.selected);
        }
        this.selected = this.fields[sid];
        this.dispatch('select-field', this.selected);
        this.app.dispatch('select-field', this.selected);


    }
}
