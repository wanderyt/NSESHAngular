'use strict';

(function($LAB, bootstrap) {
    bootstrap();

    $LAB.runQueue()
    .script([
        'scripts/controllers/NavbarCtrl.js',
        'scripts/controllers/SubNavBarCtrl.js'
    ]).wait(function() {
        angular.bootstrap(document, ['nsesh']);
    });
})($LAB, bootstrap);
