import Fields from './model';
import {FieldsView} from './view';

export default function initFields(app){

    app.views.addViewProvider(Fields, function(model, app){
        return new FieldsView(model);
    });

    app.workspace.addLeftPanel(new Fields(app));
}
