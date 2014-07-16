/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/1/14
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

(function($LAB) {
    var exports = window;

    function bootstrap(options) {
        options = options || {};

        /*$LAB.setGlobalDefaults({
            'BasePath': options.basePath || '',
            'Debug': true
        });*/

        $LAB
            .queueScript([
                'vendor/jquery-1.11.1.min.js',
                'vendor/jquery.fancybox.js',
                'vendor/bootstrap.min.js',
                'vendor/angular.js',
                'vendor/angular-ui-router.js',
                'vendor/underscore-min.js'
            ]).queueWait()
            /*.queueScript(function() {
                var locale = navigator.language.toLowerCase();
                var url = 'webjars/angularjs/1.2.13/i18n/angular-locale_' + locale + '.js';
                return url;
            })*/
            /*.queueScript([
                './vendor/angular-route.min.js'
            ])*/
            /*.queueScript([
                'webjars/angular-translate/1.1.1/angular-translate.js',
                'webjars/angular-translate-interpolation-messageformat/0.1.2/angular-translate-interpolation-messageformat.js',
                'webjars/angular-translate-loader-static-files/0.1.6/angular-translate-loader-static-files.js',
                'webjars/angular-translate-loader-url/0.1.2/angular-translate-loader-url.js',
                'webjars/angular-translate-storage-cookie/0.1.3/angular-translate-storage-cookie.js',
                'webjars/angular-translate-storage-local/0.1.3/angular-translate-storage-local.js'
            ])*/
            .queueScript([
                'vendor/jquery.mCustomScrollbar.concat.min.js'
            ]).queueWait()
            .queueScript('scripts/app.js').queueWait()
            .queueScript('scripts/config.js').queueWait()
            .queueScript([
                'scripts/filters/filters.js'
            ])
            .queueScript([
                'scripts/services/channel.js',
                'scripts/services/dataService.js',
                'scripts/services/dataStorage.js'
            ])/*
            .queueScript([
                'scripts/controllers/debugboxCtrl.js'
            ])*/;
    }

    exports.bootstrap = bootstrap;
})($LAB);
