import {Namespace} from '../web/decorators';
import TEMPLATES from './templates.html!text';

var ns = new Namespace('s-forms', TEMPLATES);

function genSid(){
    return 's'+(genSid.SID+=1);
}
genSid.SID = 0;

@ns.Component('workspace')
@ns.Template('workspace')
class FormWorkspace extends HTMLDivElement{
    create(){
        this._nodes = {};
    }
    bind(){
        this.addEventListener('click', e => {
            var node = e.target;
            while(node && node.dataset){
                if('cmd' in node.dataset){
                    var cmd = node.dataset.cmd;
                    var sid = node.dataset.args;
                    console.log(cmd, sid);
                    console.log(this._nodes[sid]);
                    break;
                }
                node = node.parentNode;
            }

            // if(cmd && sid){
            //     this.dispatchEvent(new CustomEvent(cmd, {
            //         detail: {
            //             data:data
            //         }
            //     }));
            // }

        }, false);
    }

    addField(type){
        var $elements = this.querySelector('.elements');
        var sid = genSid();
        var element = ns.format('field-'+type, {
            label:'Label'
        });
        var node = ns.node('field-element', {
            type:type,
            sid:sid,
            element:element
        });
        this._nodes[sid] = node;
        $elements.appendChild(node);

    }
}

class AbstractField extends HTMLDivElement{

}

@ns.Component('field-text')
@ns.Template('field-text')
class TextField extends AbstractField{
    bind(){

    }
}
