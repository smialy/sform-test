import Events from 'sjs-event/events';

export class Panels extends Events{
    constructor(name){
        super();
        this.name = name;
        this.panels = [];
    }

    addPanel(panel){
        this.panels.push(panel);
        this.dispatch('add-panel', panel);
    }

    show(){
        this.dispatch('show');
    }
    hide(panel){
        this.dispatch('hide');
    }
}

export class Panel{
    constructor(object, priority=0){
        this.object = object;
        this.priority = priority;
    }
}
