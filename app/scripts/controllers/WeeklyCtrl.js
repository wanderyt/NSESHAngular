/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/9/14
 * Time: 3:24 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

nsesh.controller('WeeklyCtrl', ['$scope', '$http',
    function($scope, $http) {

        var colorList = ['#6eb4cd', '#abdebe', '#ebce7b', '#76bab2',
            '#e8baa5', '#deddda', '#acacac', '#938bc0', '#b7ad80',
            '#c2c979', '#c2a7d6', '#80b1bb', '#d4c79e'];

        $("#weekContent").mCustomScrollbar({
            verticalScroll: true
        });

        $http({
            url : '/weekly.json',
            params : {
                type : 1
            },
            method : 'GET'
        }).success(function(data) {
            var schedules = modifyData(data.results);
            createTableBody(schedules);
        }).error(function(data) {
            alert(data);
        });

        function createTableBody(data) {
            var $tBody = $(".scheduleBody"),
                i = 0,
                l = data.length,
                $tr,
                $td;
            for(; i < l; i++) {
                $tr = $("<tr/>");
                $td = $("<td/>");
                $td.text(data[i].name);
                $tr.append($td);
                $tr = createRowBody(data[i].ss, $tr);
                $tBody.append($tr);
            }
        }

        function createRowBody(data, $tr) {
            var i = 0,
                l = data.length,
                $td,
                colorFlag = 0,
                totalFlag = 1;
            for(; i < l; i++) {//规则 -- 连续两格在第一格中处理格式
                if(i % 2 === 0){
                    if(data[i] === "") {
                        if(data[i + 1] === "") {
                            $td = $("<td/>").addClass("content").attr("colspan", 2);
                            $td.css("width", "12%");
                            $tr.append($td);
                            i++;
                        } else {
                            $td = $("<td/>").addClass("content");
                            $td.css("width", "6%");
                            $tr.append($td);
                        }
                    } else {
                        if(data[i + 1] !== data[i]) {
                            $td = $("<td/>").addClass("content").addClass("hasSchedule").attr("colspan", totalFlag);
                            $td.css("width", totalFlag * 6 + "%");
                            $td.attr("align", "center");
                            $td.text(data[i]);
                            $td.css("background", colorList[colorFlag++]);
                            $tr.append($td);
                            totalFlag = 1;
                        } else if(data[i + 1] === data[i]) {
                            totalFlag++;
                        }
                    }
                } else if(i % 2 === 1){
                    if(data[i] === "") {
                        $td = $("<td/>").addClass("content");
                        $td.css("width", "6%");
                        $tr.append($td);
                    } else {
                        if(data[i + 1] !== data[i]) {
                            $td = $("<td/>").addClass("content").addClass("hasSchedule").attr("colspan", totalFlag);
                            $td.attr("align", "center");
                            $td.css("width", totalFlag * 6 + "%");
                            $td.text(data[i]);
                            $td.css("background", colorList[colorFlag++]);
                            $tr.append($td);
                            totalFlag = 1;
                        } else if(data[i + 1] === data[i]) {
                            totalFlag++;
                        }
                    }
                }
            }
            return $tr;
        }

        function modifyData(data) {
            var schedules = [];
            var scheduleObj, scheduleS;

            for(var item in data) {
                scheduleS = [];
                scheduleObj = {};

                console.log(data[item]);
                scheduleObj.name = data[item].empName;

                scheduleS.push(nvl(data[item].sunAM));
                scheduleS.push(nvl(data[item].sunPM));
                scheduleS.push(nvl(data[item].monAM));
                scheduleS.push(nvl(data[item].monPM));
                scheduleS.push(nvl(data[item].tueAM));
                scheduleS.push(nvl(data[item].tuePM));
                scheduleS.push(nvl(data[item].wenAM));
                scheduleS.push(nvl(data[item].wenPM));
                scheduleS.push(nvl(data[item].thuAM));
                scheduleS.push(nvl(data[item].thuPM));
                scheduleS.push(nvl(data[item].friAM));
                scheduleS.push(nvl(data[item].friPM));
                scheduleS.push(nvl(data[item].satAM));
                scheduleS.push(nvl(data[item].satPM));
                scheduleObj.ss = scheduleS;

                schedules.push(scheduleObj);
            }

            return schedules;
        }

        function nvl(str) {
            return str == null ? "" : str;
        }
    }]);