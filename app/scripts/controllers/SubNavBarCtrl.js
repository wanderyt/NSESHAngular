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
                "sref" : "out",
                "url" : "/out"
            });
            $scope.navItems.push({
                "name" : "来访人员",
                "sref" : "come",
                "url" : "/come"
            });
            $scope.category = "公告栏";
        } else if(path == '/info' || path == '/org' || path == '/annual') {
            $scope.navItems.push({
                "name" : "公司简介",
                "sref" : "info",
                "url" : "/info"
            });
            $scope.navItems.push({
                "name" : "组织结构",
                "sref" : "org",
                "url" : "/org"
            });
            $scope.navItems.push({
                "name" : "公司年历",
                "sref" : "annual",
                "url" : "/annual"
            });
            $scope.category = "公司简介";
        } else if(path == '/weekly' || path == '/car') {
            $scope.navItems.push({
                "name" : "本周日程表",
                "sref" : "weekly",
                "url" : "/weekly"
            });
            $scope.navItems.push({
                "name" : "车辆预订表",
                "sref" : "car",
                "url" : "/car"
            });
            $scope.category = "公司动态";
        } else if(path == '/ins' || path == '/doc' || path == '/table') {
            $scope.navItems.push({
                "name" : "管理制度",
                "sref" : "ins",
                "url" : "/ins"
            });
            $scope.navItems.push({
                "name" : "管理文档",
                "sref" : "doc",
                "url" : "/doc"
            });
            $scope.navItems.push({
                "name" : "管理表格",
                "sref" : "table",
                "url" : "/table"
            });
            $scope.category = "管理中心";
        } else if(path == '/newEmp' || path == '/addr' || path == '/photo') {
            $scope.navItems.push({
                "name" : "新员工须知",
                "sref" : "newEmp",
                "url" : "/newEmp"
            });
            $scope.navItems.push({
                "name" : "员工通讯录",
                "sref" : "addr",
                "url" : "/addr"
            });
            $scope.navItems.push({
                "name" : "员工活动照片",
                "sref" : "photo",
                "url" : "/photo"
            });
            $scope.category = "员工工会";
        }
    }]);