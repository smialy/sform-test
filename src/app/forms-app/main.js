import './view';
import * as $model from './model';


class Fields{

}

class Builder{
    constructor(view){
        this.fields = new Fields();
    }

    addField(type){
        var field = $model.factory(type);
        this.fields.add(field);
        return field;
    }
}

class Settings{

}

class FNode{
    constructor(node, field, children){
        this.node = node;
        this.field = field;
        this.children = children || [];
    }
}


class BuilderView{
    constructor(){
        var $main = document.createElement('s-forms-app');
        document.body.appendChild($main);

        var $fields = document.querySelector('s-forms-fields');
        var $workspace = document.querySelector('s-forms-workspace');
        var $settings = document.querySelector('s-forms-settings');

        $fields.addEventListener('add-field', e => {
            var type = e.detail.data;
            $workspace.addField(type);
        }, false);

        $workspace.addEventListener('select', e => {
            var field = this.findField(e.detail.sid);
            $settings.update(field);
        }, false);
        $workspace.addEventListener('remove', e => this._removeField, false);

        $settings.addEventListener('update', e => this._updateField, false);

        var fields = $model.fields();
        var buff = Object.keys(fields).map(type => {
            return {type:type, label:type};
        });
        $fields.updateFiedls(buff);

    }
}

export function init(){
    var view = new BuilderView();
    var builder = new Builder(view);


    console.log('form.init()');

}
