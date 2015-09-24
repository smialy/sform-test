import {Component, Template} from '../web/decorators';
import {createNode} from '../web/utils';

import MAIN from '../tpls/main.html!text';
import FIELD from '../tpls/field.html!text';
import FIELDS from '../tpls/fields.html!text';
import SPACE from '../tpls/space.html!text';
import SETTINGS from '../tpls/settings.html!text';

var buttons = {
    text:{
        icon:'fa fa-font',
        label:'Text'
    },
    checkbox:{
        icon:'',
        label:'Checkbox'
    }
}

@Component('s-form-builder')
@Template(MAIN)
class Form extends HTMLElement{
    bind(){
        console.log(this);
    }
}

@Component('s-form-fields')
@Template(FIELDS)
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
            var node = createNode(FIELD, item);
            $section.appendChild(node);
        });
    }
}
@Component('s-form-space')
@Template(SPACE)
class FormSpace extends HTMLElement{
}

@Component('s-form-settings')
@Template(SETTINGS)
class FormSettings extends HTMLElement{
}
