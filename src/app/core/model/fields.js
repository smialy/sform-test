var nextSID = (function(){
    var SID = 0;
    return function(){
        return 's'+(SID+=1);
    };
})();

var ADD_CHILD = 'add.child';
var REMOVE_CHILD = 'remove.child';


class Dependency{

}

class Field{

    constructor(type, name, params={}){
        this.type = type;
        this.name = name;

        this.sid = nextSID();

        params = Object.assign({
          id:null,
          name:'',
          label:'',
          help:'',
          comment:'',
          value:'',
          require:false,
          defaultValue:'',
          dependent:null
        }, params);

        this.id = params.id;
        this.name = params.name;
        this.label = params.label;
        this.help = params.help;
        this.comment = params.comment;
        this.value = params.value;
        this.require = params.require;
        this.defaultValue = params.defaultValue;
        this.calculatedValue = null;
        this.dependent = new Dependency(params.dependent);

        this.parent = null;
        this._listeners = [];
    }

    accept(visitor){
        visitor(this);
    }

    get root(){
      var node = this;
      while(node.parent){
        node = node.parent;
      }
      return node;
    }

    notify(name, parent, child){
      this._listeners.forEach(listener => {
        listener[0].apply(listener[1], name, parent, child);
      });

    }
    on(callback, bind){
      this._listeners.push([callback, bind||null]);
    }
    off(callback){
      this._listeners = this._listeners.filter(listener => listener !== callback );
    }
}

class TextField extends Field{
  constructor(name, params={}){
    super('text', name, params);

    params = Object.assign({
      min: null,
      max: null,
      multiline: false
    }, params);

    this.min = params.min;
    this.max = params.max;
    this.multiline = params.multiline;
  }
}

class Options{
    costructor(options=[]){

    }
}

class ChoiceField extends Field{
    constructor(type, name, params={}){
      super(type, name, params);
      this.options = new Options(params.options);
    }
}

class RadioField extends ChoiceField{
  constructor(name, params={}){
    super('radio', name, params);
    this.layout = null;
  }
}

class CheckboxField extends ChoiceField{
  constructor(name, params={}){
    super('checkbox', name, params);
    this.layout = null;
  }
}

class SelectField extends ChoiceField{
  constructor(name, params={}){
    super('select', name, params);
  }
}

class LabelField extends Field{
    constructor(name, params){
        super('label', name, params);
    }
}

class Composite extends Field{
    constructor(type, name, params={}){
        super(type, name, params);
        this.childs = [];
    }
    addChild(field){
        field.parent = this;
        this.childs.push(field);
        this.root.notify(ADD_CHILD, this, field);
    }

    removeChild(field){
      var index = this.childs.indexOf(field);
      if(index !== -1){
        this.childs.splice(index, 1);
        if(field.parent === this){
          field.parent = null;
        }
        this.root.notify(REMOVE_CHILD, this, field);
      }
    }

    walk(callback){
      for(var i = 0;i<this.childs.length;i+=1){
          this.childs[i].accept(callback);
      }
    }

    accept(callback){
        callback(this);
        this.walk(callback);
    }
}
class Section extends Composite{
    constructor(name, params){
        super('section', name, params);
        this.multiple = params.multiple;
    }
}

class Form extends Composite{
    constructor(params){
        super('form', name, params);
    }
}

var getName = (function(){
    var fields = {};
    return function getName(type){
      if(!fields.hasOwnProperty(type)){
        fields[type] = 0;
      }
      return 'type-'+(fields+=1);
    };
})();

var factory = Object.freeze({
    text: (name, params) => new TextField,
    checkbox: (name, params) => new CheckboxField,
    radio: (name, params) => new RadioField,
    select: (name, params) => new SelectField,
    label: (name, params) => new LabelField,
    form: (name, params) => new Form,
    section: (name, params) => new Section
});

export function fieldsList(){
    return factory;
}
export function createField(type, name='', params={}){
    return new factory[type]()
}

export {
    TextField,
    CheckboxField,
    RadioField,
    SelectField,
    LabelField,
    Form,
    Section,
    Options,
    Dependency,
    Composite,
    Field
};
