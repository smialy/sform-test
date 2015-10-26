export class PanelContainerView{
    constructor(model, app){
        this.app = app;
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-panel-container', model.name);
        model.on('add-panel', this.onAddPanel, this);
    }

    onAddPanel(panel){
        var view = this.app.views.getView(panel);
        this.dom.appendChild(view.dom);
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
