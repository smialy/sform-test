import Events from 'sjs-event/events';

export class PanelContainer extends Events{
    constructor(name){
        super();
        this.name = name;
        this.panels = [];
    }

    addPanel(panel){
        this.panels.push(panel);
        this.dispatch('add-panel', panel);
    }
}

export class Panel{
    constructor(object, priority=0){
        this.object = object;
        this.priority = priority;
    }
}
