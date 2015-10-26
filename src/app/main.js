import SFormApp from './core/app';
import initFields from './fields/main';
import initCanvas from './canvas/main';

export default class main {

  static init() {
      var app = new SFormApp(document.body);
      initFields(app);
      initCanvas(app);
  }


}
