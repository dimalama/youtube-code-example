/**
 * @fileoverview This is User Model
 *
 * @author  Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */
define([
    'jquery',
    'underscore',
    'backbone'

], function($, _, Backbone){
    "use strict";

    var UserModel = Backbone.Model.extend({

        defaults: {
            APIkey: 'AIzaSyDBKfD1RpIy8tTH-rJ_s3_nZZOUlfEzGUI',
            url: 'https://www.googleapis.com/youtube/v3/search',
            part: 'snippet',
            query: ''
        }

    });


    var singletoneInstance;

    if (!singletoneInstance) {
        singletoneInstance = new UserModel();
    }

    return singletoneInstance;

});

