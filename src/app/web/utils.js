
export function format(txt, data){
    return txt.trim().replace(/\{\{(.+?)\}\}/g, function(_, name){
        return data[name] || name;
    });
}

export function processName(prefix, name, sufix){
    if(name.startsWith(prefix)){
        name = name.substr(prefix.length+1);
    }
    if(name.endsWith(sufix)){
        name = name.substr(0, name.length-sufix.length);
    }
    return name;
}

export function createNode(html, data){
    var div = document.createElement('div');
    div.innerHTML = format(html, data).trim();
    return div.firstChild;

}
export function findTempates(html){
    var div = document.createElement('div');
    div.innerHTML = html.trim();
    var templates = Array.from(div.querySelectorAll('template'));
    var tpls = {};
    return templates.map(function(template){
        var node = document.importNode(template.content, true);
        return [template.id, node, template.innerHTML];
    });
}
