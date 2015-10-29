import {Settings}  from './model';
import {SettingsView}  from './view';

export default function initSettings(app){
    app.views.addViewProvider(Settings, function(model, app){
        return new SettingsView(model);
    });
    app.workspace.addRightPanel(new Settings(app));
}
