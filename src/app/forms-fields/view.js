import {Namespace} from '../web/decorators';
import TEMPLATES from './templates.html!text';

var ns = new Namespace('s-forms', TEMPLATES);

@ns.Component('fields')
@ns.Template('fields')
class FormFields extends HTMLDivElement{
    bind(){
        this.addEventListener('click', e => {
            var cmd = e.target.dataset.cmd;
            var data = e.target.dataset.args;
            if(cmd){
                console.log(cmd);
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
