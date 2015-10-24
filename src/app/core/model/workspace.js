import Events from 'sjs-event/events';
import {PanelContainer, Panel} from './panels'

export default class Workspace extends Events{
    constructor(){
        super();
        this.panels = {
            top: new PanelContainer('top'),
            right: new PanelContainer('right'),
            center: new PanelContainer('center'),
            bottom: new PanelContainer('bottom'),
            left: new PanelContainer('left'),
            modal: new PanelContainer('modal')
        }
    }
    addPanel(side, item, priority=0){
        this.panels[side].addPanel(new Panel(item, priority))
    }
    addTopPanel(item, priority=0){
        this.addPanel('top', item, priority);
    }
    addRightPanel(item, priority=0){
        this.addPanel('right', item, priority);
    }
    addBottomPanel(item, priority=0){
        this.addPanel('bottom', item, priority);
    }
    addLeftPanel(item, priority=0){
        this.addPanel('left', item, priority);
    }
    addCenterPanel(item, priority=0){
        this.addPanel('center', item, priority);
    }
}
