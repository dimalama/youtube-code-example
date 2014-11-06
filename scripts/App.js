/**
 * @fileoverview Project entry point
 *
 * @author  Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */
require.config({
    baseUrl: 'scripts',
    paths: {
        text: "lib/text",
        backbone: 'lib/backbone',
        ejs: 'lib/ejs',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        rejs: 'lib/rejs',
        views: 'views',
        router: 'routes/router',
        models: 'models'
    },
    shim: {
        'underscore': {
            deps: ['jquery'], //dependencies
            exports: '_' //the exported symbol
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'ejs': {
            exports: 'ejs'
        }
    }
});
require(['jquery', 'views/SearchView' ], function($, SearchView){
    $(function(){
        SearchView.render();
    });
});
