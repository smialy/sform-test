export class Templates{
    constructor(html, prefix='', sufix='tpl'){
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
    prefix(name){
        return this._prefix + (name ? '-'+name : '');
    }
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
    div.innerHTML = html.trim();
    return div.firstChild;

}
function findTempates(html){
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    return Array.from(div.querySelectorAll('template'));
}


export class Router{
    constructor(dom){
        this._bindDom = dom;
        this._routes = {};
    }
    addRoute(name, callback, bind){
        this._bindRouter();
        this._routes[name] = [callback, bind|| this];
    }
    _bindRouter(){
        if(!this._routerBinded){
            this._routerBinded = true
            this._bindDom.addEventListener('click', e => {
                var node = e.target;
                while(node && node !== this._bindDom){
                    var cmd = node.dataset.cmd;
                    var args = node.dataset.args;
                    if(cmd && args && this._routes[cmd]){
                        var callback = this._routes[cmd];
                        callback[0].call(callback[1], args);
                        break;
                    }
                    node = node.parentNode;
                }

            }, false);
        }
    }
}
