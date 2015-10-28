import {Templates, Router} from '../core/utils';
import TEMPLATES from './templates.html!text';

export class NavView{
    constructor(model){
        this.tpl = new Templates(TEMPLATES, 'sform-nav');
        this.dom = this.tpl.node('root');
        console.log(this.dom);
    }
}
