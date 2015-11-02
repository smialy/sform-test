
export default class WorkspaceView{

    constructor(model, app){

        this.dom = document.createElement('div');
        this.dom.classList.add('sform-workspace');
        this.dom.appendChild(app.views.getView(model.panels.header).dom);
        this.body = document.createElement('div');
        this.body.classList.add('body');
        this.body.appendChild(app.views.getView(model.panels.left).dom);
        this.body.appendChild(app.views.getView(model.panels.center).dom);
        this.body.appendChild(app.views.getView(model.panels.right).dom);
        this.dom.appendChild(this.body);
        this.dom.appendChild(app.views.getView(model.panels.footer).dom);
        this.dom.appendChild(app.views.getView(model.panels.modal).dom);

    }

}
