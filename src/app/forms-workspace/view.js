import {Namespace} from '../web/decorators';
import TEMPLATES from './templates.html!text';

var ns = new Namespace('s-forms', TEMPLATES);

function genSid(){
    return 's'+(genSid.SID+=1);
}
genSid.SID = 0;

function findNodeDataset(root, node, name){
    while(node && root !== node && node.dataset){
        if(name in node.dataset){
            return node.dataset[name];
        }
        node = node.parentNode;
    }
    return null;
}

function findNodeCmd(root, node){
    return findNodeDataset(root, node, 'cmd');
}
function findNodeSid(root, node){
    return findNodeDataset(root, node, 'sid');
}

function findNodeEvent(root, node){
    return [findNodeCmd(root, node), findNodeSid(root, node)];
}

@ns.Component('workspace')
@ns.Template('workspace')
class FormWorkspace extends HTMLDivElement{
    create(){
        this._nodes = {};
    }
    bind(){
        this.addEventListener('click', e => {
            var node = e.target;
            var [cmd, sid] = findNodeEvent(this, node);
            console.log(cmd, sid);
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
    update(){

    }
}

@ns.Component('field-text')
@ns.Template('field-text')
class TextField extends AbstractField{

}

@ns.Component('field-checkbox')
@ns.Template('field-checkbox')
class CheckboxField extends AbstractField{

}

@ns.Component('field-radio')
@ns.Template('field-radio')
class RadioField extends AbstractField{

}
@ns.Component('field-select')
@ns.Template('field-select')
class SelectField extends AbstractField{

}
