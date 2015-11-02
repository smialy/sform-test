import {Events} from 'sjs-event';
import * as fields from '../core/model/fields';

export class FormScheme extends Events{
    constructor(){
        super();
        this._pages = [];
    }

    addPage(page){
        this._pages.push(page);
        this.dispatch('add.page', page);
    }
    removePage(page){
        this._pages.remove(page);
        this.dispatch('remove.page', page);
    }

    pages(){
        return this._pages.concat();
    }
}

export class FormPage extends Events{
    constructor(params){
        super('page', name, params);
    }
}

export class FormEntry extends Events{

}

export class Editor extends Events{
    constructor(app){
        super();
        this.app = app;

        this.form = new FormScheme();
        this.form.addPage(new FormPage(1));
        this.form.addPage(new FormPage(2));

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
