'use strict';

(function($LAB, bootstrap) {
    bootstrap();

    $LAB.runQueue()
    .script([
        'scripts/controllers/NavbarCtrl.js',
        'scripts/controllers/SubNavBarCtrl.js',
        'scripts/controllers/WeeklyCtrl.js',
        'scripts/controllers/PhotoCtrl.js'
    ]).wait(function() {
        angular.bootstrap(document, ['nsesh']);
    });
})($LAB, bootstrap);
