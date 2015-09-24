import {Namespace} from '../web/decorators';
import MAIN from './app.html!text';

var ns = new Namespace('s-form-designer', MAIN);

@ns.Component()
class Form extends HTMLElement{
    bind(){
        console.log(this);
    }
}

@ns.Component('fields')
@ns.Template('fields')
class FormFields extends HTMLElement{
    bind(){
        this.addEventListener('click', e => {
            var cmd = e.target.dataset.cmd;
            var data = e.target.dataset.args;
            if(cmd){
                this.dispatchEvent(new CustomEvent(cmd, {
                    detail: {
                        data:data
                    }
                }));
            }

        }, false);
    }

    updateFiedls(data){
        var $section = this.querySelector('section');
        data.forEach(item => {
            var node = ns.node('field', item);
            $section.appendChild(node);
        });
    }
}

@ns.Component('space')
@ns.Template('space')
class FormSpace extends HTMLElement{
}

@ns.Component('settings')
@ns.Template('settings')
class FormSettings extends HTMLElement{
}
