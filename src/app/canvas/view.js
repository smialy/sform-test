import {Templates, Router} from '../core/utils';
import TEMPLATES from './templates.html!text';


export class CanvasView{
    constructor(model){
        this._nodes = {};

        this.dom = document.createElement('div');
        this.dom.classList.add('sform-canvas');
        this.tpl = new Templates(TEMPLATES, 'sform');
        this.router = new Router(this.dom);
        this.router.addRoute('remove', model.removeField, model);

        model.on('add-field', this.onAddField, this);
        model.on('remove-field', this.onRemoveField, this);
    }

    onAddField(field){
        var type = field.type
        var element = this.tpl.format('field-'+type, {
            label:'Label'
        });
        var node = this.tpl.node('field-element', {
            type:type,
            sid:field.sid,
            element:element
        });
        this._nodes[field.sid] = node;
        this.dom.appendChild(node);
    }

    onRemoveField(field){
        var sid = field.sid;
        var node = this._nodes[sid];
        this.dom.removeChild(node);
        delete this._nodes[sid];
    }
}

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
