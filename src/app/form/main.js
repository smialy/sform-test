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
        var main = document.createElement('s-form-builder');
        document.body.appendChild(main);

        main.addEventListener('add-field', e => {
            var type = e.detail.data;

        }, false);

        var fields = $model.fields();
        var buff = Object.keys(fields).map(type => {
            return {type:type, label:type};
        });
        //main.updateFiedls(buff);

    }
}

export function init(){
    var view = new BuilderView();
    var builder = new Builder(view);


    console.log('form.init()');

}
