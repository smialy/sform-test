export class PanelsView{
    constructor(model, app){
        this.app = app;
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-panels', 'hidden', model.name);
        model.on('add-panel', this.onAddPanel, this);
        model.on('show', this.onShow, this);
        model.on('hide', this.onHide, this);
    }

    onAddPanel(panel){
        var view = this.app.views.getView(panel);
        this.dom.appendChild(view.dom);
    }

    onShow(){
        this.dom.classList.remove('hidden');
    }
    onHide(){
        this.dom.classList.add('hidden');
    }
}

export class PanelView{
    constructor(model, app){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-panel');
        var view = app.views.getView(model.object);
        this.dom.appendChild(view.dom);
    }
}
