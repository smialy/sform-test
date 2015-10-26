import {Events} from 'sjs-event';

import ViewRegistry from './view/registry';
import WorkspaceView from './view/workspace';
import {PanelView, PanelContainerView} from './view/panels';
import {Panel, PanelContainer} from './model/panels';
import Workspace from './model/workspace';


export default class SFormApp extends Events{
    constructor(dom){
        super();
        this.dom = dom;
        this.views = new ViewRegistry(this);

        this.initViews();
        this.initWorkspace();
    }

    initWorkspace(){
        this.workspace = new Workspace();
        var view = this.views.getView(this.workspace);
        this.dom.classList.add('sform');
        this.dom.appendChild(view.dom);
    }
    initViews(){
        this.views.addViewProvider(Workspace, (model, app) => {
            return new WorkspaceView(model, app);
        });
        this.views.addViewProvider(PanelContainer, (model, app) => {
            return new PanelContainerView(model, app);
        });
        this.views.addViewProvider(Panel, (model, app) => {
            return new PanelView(model, app);
        });
    }
    addField(name){

    }
}
