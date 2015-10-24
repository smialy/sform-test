
export default class WorkspaceView{

    constructor(model, app){
        this.dom = document.createElement('div');
        this.dom.classList.add('sform-workspace');
        this.dom.appendChild(app.views.getView(model.panels.top).dom);
        this.dom.appendChild(app.views.getView(model.panels.left).dom);
        this.dom.appendChild(app.views.getView(model.panels.center).dom);
        this.dom.appendChild(app.views.getView(model.panels.right).dom);
        this.dom.appendChild(app.views.getView(model.panels.bottom).dom);
        this.dom.appendChild(app.views.getView(model.panels.modal).dom);

    }

}
