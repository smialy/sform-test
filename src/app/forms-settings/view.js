import {Namespace} from '../web/decorators';
import TEMPLATES from './templates.html!text';

var ns = new Namespace('s-form', TEMPLATES);

@ns.Component('settings')
@ns.Template('settings')
class FormSettings extends HTMLElement{

}
