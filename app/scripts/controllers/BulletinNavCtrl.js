/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/4/14
 * Time: 1:45 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

nsesh.controller('BulletinNavCtrl', ['$scope', '$location', 'dataStorage', 'channel', 'dataService',
    function($scope, $location, dataStorage, channel, dataService) {

        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };
    }]);