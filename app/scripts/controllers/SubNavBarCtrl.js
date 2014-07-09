/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/7/14
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

nsesh.controller('SubNavBarCtrl', ['$scope', '$location', 'dataStorage', 'channel', 'dataService',
    function($scope, $location, dataStorage, channel, dataService) {

        $scope.isActive = function(viewLocation) {
            return viewLocation === $location.path();
        };

        var path = $location.path();
        $scope.navItems = [];

        if(path == '/out' || path == '/come') {
            $scope.navItems.push({
                "name" : "每周出差",
                "sref" : "out"
            });
            $scope.navItems.push({
                "name" : "来访人员",
                "sref" : "come"
            });
        } else if(path == '/info' || path == '/org' || path == '/annual') {
            $scope.navItems.push({
                "name" : "公司简介",
                "sref" : "info"
            });
            $scope.navItems.push({
                "name" : "组织结构",
                "sref" : "org"
            });
            $scope.navItems.push({
                "name" : "公司年历",
                "sref" : "annual"
            });
        } else if(path == '/weekly' || path == '/car') {
            $scope.navItems.push({
                "name" : "本周日程表",
                "sref" : "weekly"
            });
            $scope.navItems.push({
                "name" : "车辆预订表",
                "sref" : "car"
            });
        } else if(path == '/ins' || path == '/doc' || path == '/table') {
            $scope.navItems.push({
                "name" : "管理制度",
                "sref" : "ins"
            });
            $scope.navItems.push({
                "name" : "管理文档",
                "sref" : "doc"
            });
            $scope.navItems.push({
                "name" : "管理表格",
                "sref" : "table"
            });
        } else if(path == '/newEmp' || path == '/addr' || path == '/photo') {
            $scope.navItems.push({
                "name" : "新员工须知",
                "sref" : "newEmp"
            });
            $scope.navItems.push({
                "name" : "员工通讯录",
                "sref" : "addr"
            });
            $scope.navItems.push({
                "name" : "员工活动照片",
                "sref" : "photo"
            });
        }
    }]);