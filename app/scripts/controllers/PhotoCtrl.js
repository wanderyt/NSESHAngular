/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/14/14
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

nsesh.controller('PhotoCtrl', ['$scope', '$http',
    function($scope, $http) {

        $("#contentDetail").mCustomScrollbar({
            verticalScroll: true
        });

        $http({
            url : '/allPhotoType.json',
            method : 'GET'
        }).success(function(data) {
            console.log(data.results);
            var photoTypes = data.results,
                $li,
                $titleDiv,
                $ui = $(".photosUl");
            for(var props in photoTypes) {
                if(photoTypes.hasOwnProperty(props)) {
                    $li = $("<li></li>").addClass("photoTypeLi");
                    $li = __createPhotoElement($li, photoTypes[props].PHOTOCATEGORY);
                    $titleDiv = $("<div></div>").addClass("photoTitleDiv");
                    $titleDiv.text(photoTypes[props].PHOTOCATEGORY);
                    $li.append($titleDiv);
                    //$li.css('height', $li.css('width'));
                    $ui.append($li);
                }
            }

            //add click event on lis of photo types
            $(".photoTypeLi").on("click", function() {
                var selectLi = $(this).find(".photoTitleDiv").text();
                $http({
                    url : '/photoByType.json',
                    params : {
                        type : selectLi
                    },
                    method : 'GET'
                }).success(function(data) {
                    $(".photosDisplay").empty();

                    $(".photosUl").addClass("hidden");
                    var photosList = data.results,
                        $photoul = $(".photosDisplay"),
                        $photoli,
                        $photoa,
                        $photoImg,
                        j,
                        l = photosList.length;
                    for(j = 0; j < l; j++) {
                        $photoli = $("<li/>").addClass("photoLi");
                        $photoa = $("<a/>").addClass("fancyBox").attr("href", photosList[j].photoURL);
                        $photoImg = $("<img/>");
                        $photoImg.attr("src", photosList[j].photoURL);
                        $photoa.append($photoImg);
                        $photoli.append($photoa);
                        $photoul.append($photoli);
                    }
                    $(".photosDisplay").removeClass("hidden");
                    $(".clickBack").removeClass("hidden");

                    $(".fancyBox").fancybox({
                        'type' : 'image',
                        'onComplete' : function() {
                            $("#fancybox-inner").animate({top: 0, left: 0}, 200).css("top", 0)
                                .css("left", 0);
                        }
                    });
                    $(".clickBack").click(function() {
                        $(".photosDisplay").addClass("hidden");
                        $(".clickBack").addClass("hidden");
                        $(".photosUl").removeClass("hidden");
                    });
                }).error(function(data) {
                    alert(data);
                });
            });
        }).error(function(data) {
            alert(data);
        });

        function __createPhotoElement($container, photoType) {
            var $photoDiv,
                $photoImg;
            $photoDiv = $("<a/>").addClass("photoDiv");
            $photoImg = $("<img/>").addClass("img-rounded").addClass("img-responsive");
            $http({
                url : '/onePhotoByType.json',
                params : {
                    type : photoType
                },
                method : 'GET'
            }).success(function(data) {
                $photoImg.attr("src", data.results[0].photoURL);
            });
            $photoDiv.append($photoImg);
            $container.append($photoDiv);
            return $container;
        };
    }
]);

