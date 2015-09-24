import {format, findTempates, processName, createNode} from './utils';
import {registerComponent} from './main';

export class Namespace{
    constructor(prefix, html, sufix='-tpl'){
        this._prefix = prefix;
        this._html = html;
        this._tpls = {};

        var items = findTempates(html);
        items.forEach(([id, node, html]) => {
            var name = processName(prefix, id, sufix);
            this._tpls[name] = {
                node:node,
                html: html
            };
        });
        console.log(Object.keys(this._tpls));
    }
    node(name, data=null){
        if(data){
            return createNode(this.format(name, data));
        }
        return this._tpls[name].node;
    }
    format(name, data){
        return format(this.html(name), data);
    }
    html(name){
        return this._tpls[name].html;
    }
    tpl(name){
        var self = this;
        return function(data){
            return self.format(name, data);
        };
    }

    Component(name){
        var selector = this.prefix(name);
        return function Component(target){
            registerComponent(selector, target);
        }
    }

    Template(name){
        var id = this.prefix(name);
        var html = this.html(name);
        return function Template(target){
            target.$tpl = html;
        }
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

export function Template(html){
    return function(target){
        target.$tpl = html;
    };
}
