import {Events} from 'sjs-event';

export class Settings extends Events{
    constructor(app){
        super();
        this.app = app;
        app.on('unselect-field', this.onUnselect, this);
        app.on('select-field', this.onSelect, this);
        this.selected = null
    }

    onSelect(field){
        this.selected = field;
        this.dispatch('select', field);
    }
    onUnselect(field){
        this.selected = null;
        this.dispatch('unselect', field);
    }
    update(name, value){
        this.selected[name] = value;
        this.app.dispatch('update-field', this.selected, name, value);
    }
}
