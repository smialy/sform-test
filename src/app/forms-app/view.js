import {Namespace} from '../web/decorators';
import TEMPLATES from './template.html!text';

var ns = new Namespace('s-form', TEMPLATES);

@ns.Component('app')
@ns.Template('app')
class Form extends HTMLDivElement{
    bind(){

    }
}

var smd = new Namespace('s-md');

@smd.Component('button')
class Button extends HTMLButtonElement{

    create(){
        this._enabled = true;
    }

    bind(){
    }

    unbind(){

    }

    get type(){
        return 'button';
    }

    get enabled(){
        return this._enabled;
    }

    disable(){
        this.setAttribute('disabled', 'disabled');
        this._enabled = false;
    }
    enable(){
        this.removeAttribute('disabled');
        this._enabled = true;
    }

}

@smd.Component('input')
class Input extends HTMLInputElement{

    create(){
        this._enabled = true;
    }

    bind(){
    }

    unbind(){

    }

    get enabled(){
        return this._enabled;
    }

    disable(){
        this.setAttribute('disabled', 'disabled');
        this._enabled = false;
    }
    enable(){
        this.removeAttribute('disabled');
        this._enabled = true;
    }
}
