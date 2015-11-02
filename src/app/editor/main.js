import {EditorView, FormSchemeView, FormPageView, FormEntryView} from './view';
import {Editor, FormScheme, FormPage, FormEntry} from './model';

export default function initEditor(app){

    app.views.addViewProvider(Editor, function(model, app){
        return new EditorView(model, app.views);
    });
    app.views.addViewProvider(FormScheme, function(model, app){
        return new FormSchemeView(model, app.views);
    });
    app.views.addViewProvider(FormPage, function(model, app){
        return new FormPageView(model, app.views);
    });
    app.views.addViewProvider(FormEntry, function(model, app){
        return new FormEntryView(model, app.views);
    });

    app.workspace.addCenterPanel(new Editor(app));
}
