
export default class WorkspaceView{

    constructor(model, app){

        this.dom = document.createElement('div');
        this.dom.classList.add('sform-workspace');
        this.dom.appendChild(app.views.getView(model.panels.header).dom);
        this.center = document.createElement('div');
        this.center.classList.add('center');
        this.center.appendChild(app.views.getView(model.panels.left).dom);
        this.center.appendChild(app.views.getView(model.panels.canvas).dom);
        this.center.appendChild(app.views.getView(model.panels.right).dom);
        this.dom.appendChild(this.center);
        this.dom.appendChild(app.views.getView(model.panels.footer).dom);
        this.dom.appendChild(app.views.getView(model.panels.modal).dom);

    }

}
