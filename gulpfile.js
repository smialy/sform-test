'use strict';

require('babel/register');

require('require-dir')('./gulp/tasks', {recurse: true});

require('gulp').task('default', ['serve']);
