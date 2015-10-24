import {registerComponent} from './main';

export class Namespace{
    constructor(prefix, html='', sufix='tpl'){
        this._prefix = prefix;
        this._html = html;
        this._tpls = {};

        var templates = findTempates(html);
        templates.forEach(template => {
            var id = template.id;
            var name = processName(prefix, id, sufix);
            this._tpls[name] = template;
        });
    }
    template(name){
        return this._tpls[name];
    }
    node(name, data=null){
        return createNode(this.format(name, data));
    }
    format(name, data){
        return format(this.html(name), data);
    }
    html(name){
        return this._tpls[name].innerHTML;
    }

    Component(name){
        var selector = this.prefix(name);
        return function Component(target){
            registerComponent(selector, target);
        };
    }

    Template(name='root', shadow=false){
        var template = this.template(name);
        return function Template(target){
            target.$template = template;
            target.$shadow = shadow;
        };
    }

    prefix(name){
        return this._prefix + (name ? '-'+name : '');
    }
}

export function Component(selector){
    return function Component(target){
        registerComponent(selector, target);
    };
}

export function Template(html, shadow=false){
    return function(target){
        target.$template = html;
        target.$shadow = shadow;
    };
}

function format(txt, data){
    return txt.trim().replace(/\{\{(.+?)\}\}/g, function(_, name){
        return data[name] || name;
    });
}

function processName(prefix, name, sufix){
    if(name.startsWith(prefix)){
        name = name.substr(prefix.length);
    }
    if(name.endsWith(sufix)){
        name = name.substr(0, name.length-sufix.length);
    }
    return name.replace(/^-+|-+$/g, '');
}

function createNode(html, data){
    var div = document.createElement('div');
    div.innerHTML = format(html, data).trim();
    return div.firstChild;

}
function findTempates(html){
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return Array.from(div.querySelectorAll('template'));
}
