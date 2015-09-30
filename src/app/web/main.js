var components = {};

export function registerComponent(name, Component){
    extendsComponents(name, Component);
}

function extendsComponents(selector, Component){
    var defaults = {
        create:function(){},
        bind:function(){},
        unbind:function(){},
        attrs:function(){},
        createdCallback: function() {
            console.log('createdCallback');
            if(Component.$shadow){
                this.createShadowRoot();
            }
            this.create();
        },
        attachedCallback: function() {
            console.log('attachedCallback');
            var template = Component.$template || null;
            if(template){
                var content = template.content ? template.content : getFragmentNode(template);
                var root = Component.$shadow ? this.shadowRoot : this;
                root.appendChild(document.importNode(content, true));
            }
            this.bind();
        },
        detachedCallback: function() {
            console.log('detachedCallback');
            this.unbind();
        },
        attributeChangedCallback: function(attr, oldVal, newVal) {
            this.attrs(attr, newVal, oldVal);
        }
    };
    var proto = Component.prototype;
    Object.keys(defaults).forEach(name => {
        if(typeof proto[name] === 'undefined'){
            proto[name] = defaults[name];
        }
    });
    console.log('registerElement', selector);
    document.registerElement(selector, Component);

}

function getFragmentNode(node){
    var child;
    var fragment = document.createDocumentFragment();
    while (child = node.firstChild) {
        fragment.appendChild(child);
    }
    return fragment;
}
