import {Events} from 'sjs-event';

export default class Fields extends Events{
    constructor(app){
        super();
        this.app = app;
        this.buttons = ['Text','Checkbox','Radio', 'Select'];
    }

    addField(type){
        this.app.dispatch('add-field', type);
    }
}
