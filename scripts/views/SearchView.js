/**
 * @fileoverview This is Search View
 *
 * @author  Dmitry.Lukyanenko (dmitry.lukianenko@gmail.com)
 *
 * @preserve Copyright © 2013 All rights reserved.
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'rejs!/templates/Search',
    'rejs!/templates/Result',
    'models/UserModel'

], function($, _, Backbone, EJSSearch, EJSResult, UserModel){
    "use strict";

    var SearchView = Backbone.View.extend({

        searchQuery : null,

        className: 'result-view',

        //event bindings
        events: {
            'click input[type="submit"]': 'onClick',
            'keyup input[type="search"]': 'onKeyup',
            'click #next': 'goTo',
            'click #prev': 'goTo'
        },

        /**
         * Initialize search view
         */
        initialize : function(){
            console.log('SearchView has been initialized');
        },

        /**
         * Handler click event for the next/prev buttons
         * @param {object} event
         */
        goTo: function(event){
            var where = event.currentTarget.id;
            if(where === 'next'){
                where = this.model.get('nextPageToken');
            }else if(where === 'prev'){
                where = this.model.get('prevPageToken');
            }
            this.sendQuery('', where);
        },

        /**
         * Handler click event for the search button
         */
        onClick: function(){
            this.sendQuery($(this.el).find('input[type="search"]').val());
        },

        /**
         * Handler keyup event for search field
         * @param {object} event
         */
        onKeyup: function(event){
            if(event.which == 13 || event.keyCode == 13){
                this.sendQuery(event.target.value);
            }
        },

        /**
         * Removing old search results
         */
        cleanUp: function(){
            var $searchResults = $('.' + this.className);
            if($searchResults.length){
                $('.' + this.className).remove();
            }
        },

        /**
         * Sending search query to the server using YouTube API
         * @param {string} query
         * @param {string} where
         */
        sendQuery: function(query, where){
            var self = this;
            var searchQuery = '';
            if(query.length){
                this.model.set({'query': query});
                searchQuery = this.model.get('url') + '?part=' + this.model.get('part') + '&q=' + this.model.get('query') + '&key=' + this.model.get('APIkey');
            }
            if(typeof where !== 'undefined'){
                searchQuery = this.model.get('url') + '?part=' + this.model.get('part') + '&q=' + this.model.get('query') + '&key=' + this.model.get('APIkey') + '&pageToken=' + where;
            }
            $.ajax({
                url: searchQuery,
                type: 'GET',
                success: function(response) {
                    if(response){
                        self.model.set(response);
                        self.cleanUp();
                        $(self.el).append(EJSResult(self.model.toJSON()));
                    }
                },
                error: function(err){
                    console.error(err)
                }
            });
        },

         render : function(){
            $(this.el).html(EJSSearch({}));
            return this;
         }
    });

    var singletoneInstance;

    if (!singletoneInstance) {
        singletoneInstance = new SearchView({el: $('.body-content'), model: UserModel});
    }

    return singletoneInstance;
});



