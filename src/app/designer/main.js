import './view';
import * as $model from './model';


class Builder{
    constructor(view){
        this.fields = new Fields();
    }

    addField(type){
        var field = $model.factory(type)
        this.fields.add(field);
        return field;
    }
}

class Settings{

}

class Fields{

}

class BuilderView{
    constructor(){
        var $main = document.createElement('s-form-designer');
        var $fields = document.createElement('s-form-designer-fields');
        var $space = document.createElement('s-form-designer-space');
        var $settings = document.createElement('s-form-designer-settings');
        $main.appendChild($fields);
        $main.appendChild($space);
        $main.appendChild($settings);
        document.body.appendChild($main);

        $main.addEventListener('add-field', e => {
            var type = e.detail.data;

        }, false);

        var fields = $model.fields();
        var buff = Object.keys(fields).map(type => {
            return {type:type, label:type};
        });
        console.log(fields);
        $fields.updateFiedls(buff);

    }
}

export function init(){
    var view = new BuilderView();
    var builder = new Builder(view);


    console.log('form.init()');

}
