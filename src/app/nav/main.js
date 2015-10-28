import {NavView} from './view';
import {Nav} from './model';

export default function initNav(app){

    app.views.addViewProvider(Nav, function(model, app){
        return new NavView(model);
    });

    app.workspace.addHeaderPanel(new Nav(app));
}
