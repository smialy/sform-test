import {Events} from 'sjs-event';
import {createField} from '../core/model/fields';


export class Canvas extends Events{
    constructor(app){
        super();
        app.on('add-field', this.onAddField, this);
    }
    onAddField(type){
        var field = createField(type);
        this.dispatch('add-field', field);

    }
}
