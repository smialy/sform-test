import {CanvasView} from './view';
import {Canvas} from './model';

export default function initCanvas(app){

    app.views.addViewProvider(Canvas, function(model, app){
        return new CanvasView(model);
    });

    app.workspace.addCanvasPanel(new Canvas(app));
}
