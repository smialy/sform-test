import Events from 'sjs-event/events';
import {PanelContainer, Panel} from './panels'

export default class Workspace extends Events{
    constructor(){
        super();
        this.panels = {
            header: new PanelContainer('header'),
            left: new PanelContainer('left'),
            canvas: new PanelContainer('canvas'),
            right: new PanelContainer('right'),
            footer: new PanelContainer('footer'),
            modal: new PanelContainer('modal')
        }
    }
    addPanel(side, item, priority=0){
        this.panels[side].addPanel(new Panel(item, priority))
    }
    addHeaderPanel(item, priority=0){
        this.addPanel('header', item, priority);
    }
    addLeftPanel(item, priority=0){
        this.addPanel('left', item, priority);
    }
    addCanvasPanel(item, priority=0){
        this.addPanel('canvas', item, priority);
    }
    addRightPanel(item, priority=0){
        this.addPanel('right', item, priority);
    }
    addFooterPanel(item, priority=0){
        this.addPanel('footer', item, priority);
    }
}
