import {Templates} from '../core/utils';
import TEMPLATES from './templates.html!text';


export class CanvasView{
    constructor(model){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-canvas');
        this.tpl = new Templates(TEMPLATES, 'sform');
        model.on('add-field', this.onAddField, this);
        this._nodes = {};
    }

    onAddField(field){
        var type = field.type
        var sid = genSid();
        var element = this.tpl.format('field-'+type, {
            label:'Label'
        });
        var node = this.tpl.node('field-element', {
            type:type,
            sid:sid,
            element:element
        });
        this._nodes[sid] = node;
        this.dom.appendChild(node);
    }
}

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
