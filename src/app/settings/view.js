import {Templates, Router} from '../core/utils';
import TEMPLATES from './templates.html!text';

export class SettingsView{
    constructor(model){
        this.tpl = new Templates(TEMPLATES, 'sform-settings');
        this.dom = this.tpl.node('root');
        this.items = {
            label: this.dom.querySelector('#settings-field-label'),
            name: this.dom.querySelector('#settings-field-name'),
        };
        model.on('select', this.onSelect, this);
        model.on('unselect', this.onUnselect, this);
        model.on('update', this.onUpdate, this);


        this.dom.addEventListener('click', function(e){
        }, false);
        this.dom.addEventListener('change', function(e){
            model.update(e.target.name, e.target.value);
        }, false);
    }

    onSelect(field){
        this.items.label.value = field.label;
        this.items.name.value = field.name;
    }

    onUnselect(field){
        this.items.label.value = '';
        this.items.name.value = '';
    }

    onUpdate(field){

    }
}
