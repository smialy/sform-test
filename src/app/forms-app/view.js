import {Namespace} from '../web/decorators';
import TEMPLATES from './template.html!text';

var ns = new Namespace('s-forms', TEMPLATES);

@ns.Component('app')
@ns.Template('app')
class Form extends HTMLDivElement{
    bind(){

    }
}
