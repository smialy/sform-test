/*
import * as app from 'app/forms-app/main';
import * as fields from 'app/forms-fields/main';
import * as settings from 'app/forms-settings/main';
import * as workspace from 'app/forms-workspace/main';
*/
import ViewRegistry from './core/view/registry';
import WorkspaceView from './core/view/workspace';
import {PanelView, PanelContainerView} from './core/view/panels';

import Workspace from './core/model/workspace';
import {Panel, PanelContainer} from './core/model/panels';

import initFields from './fields/main';


class SForm{
    constructor(dom){
        this.dom = dom;
        this.views = new ViewRegistry(this);

        this.initViews();
        this.initWorkspace();
    }

    initWorkspace(){
        this.workspace = new Workspace();
        var view = this.views.getView(this.workspace);
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
}


/**
 * This class is called by the app entry point.
 * It holds the logic initiation.
 * @class main
 */
export default class main {
  /**
   * Inits the whole logic of the app
   * @method init
   * @static
   */
  static init() {
      var app = new SForm(document.body);
      initFields(app);
  }


}
