import * as app from 'app/forms-app/main';
import * as fields from 'app/forms-fields/main';
import * as settings from 'app/forms-settings/main';
import * as workspace from 'app/forms-workspace/main';
/**
 * @module src/app
 */


/**
 * This class is called by the app entry point.
 * It holds the logic initiation.
 * @class main
 */
export default class main {
  /**
   * Inits the whole logic of the app
   * @method init
   * @static
   */
  static init() {
      app.init();
      fields.init();
      settings.init();
      workspace.init();
  }


}
