var components = {};

function registerComponent(name, Component){
    extendsComponents(name, Component);
}

function extendsComponents(selector, Component){
    console.log('registerComponent', selector, Component);
    var defaults = {
        create:function(){},
        bind:function(){},
        unbind:function(){},
        attrs:function(){},
        createdCallback: function() {
            console.log('createdCallback');
            this.create();
        },
        attachedCallback: function() {
            console.log('attachedCallback');
            var tpl = Component.$tpl || null;
            if(tpl){
                if(typeof tpl === 'string'){
                    this.innerHTML = tpl;
                }else{
                    this.appendChild(clone);
                }
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
    console.log('registerElement', selector, Component.prototype);
    document.registerElement(selector, Component);

}
