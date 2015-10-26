import {Templates, Router} from '../core/utils';
import TEMPLATES from './templates.html!text';


export class FieldsView{

    constructor(model, app){
        this.tpl = new Templates(TEMPLATES, 'sform-fields');
        this.dom = this.tpl.node('root');
        this.dom.classList.add('sform-fields');
        this.btns = this.dom.querySelector('section');

        model.buttons.forEach(item => {
            var btn = this.tpl.node('btn',{
                type:item,
                label:item
            });
            this.btns.appendChild(btn);
        });
        this.router = new Router(this.dom);
        this.router.addRoute('add-field', type => {
            model.addField(type.toLowerCase());
        });
    }

    route(name, callback, bind){
        this.router.add(name, callback, bind);
    }
}
