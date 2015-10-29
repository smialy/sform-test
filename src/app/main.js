import SFormApp from './core/app';
import initNav from './nav/main';
import initFields from './fields/main';
import initCanvas from './canvas/main';
import initSettings from './settings/main';


export default class main {

  static init() {
      var app = new SFormApp(document.body);
      initNav(app);
      initFields(app);
      initCanvas(app);
      initSettings(app);
  }


}
