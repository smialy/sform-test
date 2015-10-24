
export default class ViewRegistry{
    constructor(app){
        this.app = app;
        this.views = new WeakMap();
        this.providers = [];
    }

    addViewProvider(model, createView){
        this.providers.push([model, createView]);
    }

    getView(model){
        if(!this.views.has(model)){
            var view = this.createView(model);
            this.views.set(model, view);
        }
        return this.views.get(model);
    }

    createView(model){
        var provider = this.findProvider(model);
        if(typeof provider === 'function'){
            return provider(model, this.app);
        }
        if(typeof provider.createView === 'function'){
            return provider.createView(model, this.app);
        }
        throw new Error('Incorect view provider');
    }

    findProvider(model){
        for(var i = 0;i<this.providers.length;i+=1){
            if(model instanceof this.providers[i][0]){
                return this.providers[i][1];
            }
        }
        throw new Error('Not found view provider for model:'+model);
    }

    clear(){
        this.views = new WeekMap();
        this.providers = [];
    }
}
