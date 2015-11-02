import Events from 'sjs-event/events';
import {Panels, Panel} from './panels'

export default class Workspace extends Events{
    constructor(){
        super();
        this.panels = {
            header: new Panels('header'),
            left: new Panels('left'),
            center: new Panels('center'),
            right: new Panels('right'),
            footer: new Panels('footer'),
            modal: new Panels('modal')
        }
    }
    addPanel(side, item, priority=0){
        var panel = this.panels[side];
        panel.show();
        panel.addPanel(new Panel(item, priority))
    }
    addHeaderPanel(item, priority=0){
        this.addPanel('header', item, priority);
    }
    addLeftPanel(item, priority=0){
        this.addPanel('left', item, priority);
    }
    addCenterPanel(item, priority=0){
        this.addPanel('center', item, priority);
    }
    addRightPanel(item, priority=0){
        this.addPanel('right', item, priority);
    }
    addFooterPanel(item, priority=0){
        this.addPanel('footer', item, priority);
    }
}
