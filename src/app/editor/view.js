import {Templates, Router} from '../core/utils';
import TEMPLATES from './templates.html!text';

var tpl = new Templates(TEMPLATES, 'sform');

export class FormSchemeView{
    constructor(model, views){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-editor-scheme');
        this.views = views;
        model.on('add.page', this.onAddPage, this);
        model.pages().forEach(page => {
            this.onAddPage(page);
        });
    }
    onAddPage(page){
        var pageView = this.views.getView(page);
        this.dom.appendChild(pageView.dom);
    }
}

export class FormPageView{
    constructor(model, views){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-editor-scheme-page');
        var html = tpl.format('field-page', {
            number:1
        });
        this.dom.innerHTML = html;
    }
}
export class FormEntryView{
    constructor(model, views){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-editor-scheme-entry');
    }
}


export class EditorView{
    constructor(model, views){
        this._nodes = {};

        this.dom = document.createElement('div');
        this.dom.classList.add('sform-editor');

        var formView = views.getView(model.form);
        this.dom.appendChild(formView.dom);



        this.router = new Router(this.dom);
        this.router.addRoute('remove', model.removeField, model);
        this.router.addRoute('select', model.selectField, model);
        this.router.addRoute('up', model.upField, model);
        this.router.addRoute('down', model.downField, model);

        model.on('add-field', this.onAddField, this);
        model.on('remove-field', this.onRemoveField, this);
        model.on('select-field', this.onSelectField, this);
        model.on('unselect-field', this.onUnselectField, this);
        model.on('update', this.onUpdate, this);
    }
    onUpdate(field){
        var node = this._nodes[field.sid];
        var body = node.querySelector('.element-body');
        var html = tpl.format('field-'+field.type, {
            label:field.label,
            name:field.name
        });
        body.innerHTML = html;
    }
    onAddField(field){
        var type = field.type
        var element = tpl.format('field-'+type, {
            label:'Label'
        });
        var node = tpl.node('field-element', {
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

    onSelectField(field){
        var sid = field.sid;
        var node = this._nodes[sid];
        node.classList.add('selected');
    }
    onUnselectField(field){
        var sid = field.sid;
        var node = this._nodes[sid];
        node.classList.remove('selected');
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
