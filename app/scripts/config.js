'use strict';

//var nsesh = angular.module('nsesh');

//var MYSQL = require('mysql');
/*var NSESH_CONNECTION = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'nsesh'
});*/

function getContextPath() {
    var contextPath = '/' + window.location.pathname.split('/')[1]; // "/demo"
    return contextPath;
}

var _config = {
    contextPath: '/', // "http://localhost:8000/MyAngularProject"
    service: {
        offline: true,
        proxy: {
            enabled: false,
            path: 'proxy' // "http://localhost:8000/demo/proxy"
        },
        metadata: {
            online: {
                url: 'service'
            },
            offline: {
                url: 'data'
            }
        },
        api: {
            'items': {
                online: {
                    path: 'odata.xsodata/Items',
                    type: 'odata'
                },
                offline: {
                    path: 'items.json',
                    type: 'json'
                }
            },
            'brands': {
                online: {
                    path: 'brands',
                    type: 'json'
                },
                offline: {
                    path: 'brands.json',
                    type: 'json'
                }
            },
            'brand': {
                online: {
                    path: 'brands/{id}',
                    type: 'json'
                },
                offline: {
                    path: 'brand.json',
                    type: 'json'
                }
            },
            'posts': {
                online: {
                    path: 'posts',
                    type: 'json'
                },
                offline: {
                    path: 'posts.json',
                    type: 'json'
                }
            },
            'post': {
                online: {
                    path: 'posts/{id}',
                    type: 'json'
                },
                offline: {
                    path: 'post.json',
                    type: 'json'
                }
            },
            'related_posts': {
                online: {
                    path: 'odata.xsodata/brand',
                    type: 'odata'
                },
                offline: {
                    path: 'related_posts.json',
                    type: 'json'
                }
            },
            'ralated_topics': {
                 online: {
                    path: 'sick',
                    type: 'json'
                },
                offline: {
                    path: 'ralated_topics.json',
                    type: 'json'
                }
            }
        }
    },
    map: {
        location: {
            lat: 43.2964,
            lng: 5.37
        },
        zoom: 5
    }
};

nsesh.constant('config', _config);


// Configuring $routeProvider, $stateProvider
nsesh.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('out');

    $stateProvider
        .state('out', {
            url: "/out",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/bulletin/out.html"
                }
            }
        }).state('come', {
            url: "/come",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/bulletin/come.html"
                }
            }
        })
        .state('info', {
            url: "/info",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/info/info.html"
                }
            }
        })
        .state('org', {
            url: "/org",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/info/org.html"
                }
            }
        })
        .state('annual', {
            url: "/annual",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/info/annual.html"
                }
            }
        })
        .state('weekly', {
            url: "/weekly",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/news/weekly.html"
                }
            }
        })
        .state('car', {
            url: "/car",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/news/car.html"
                }
            }
        })
        .state('ins', {
            url: "/ins",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/management/ins.html"
                }
            }
        })
        .state('doc', {
            url: "/doc",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/management/doc.html"
                }
            }
        })
        .state('table', {
            url: "/table",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/management/table.html"
                }
            }
        })
        .state('newEmp', {
            url: "/newEmp",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/union/newEmp.html"
                }
            }
        })
        .state('addr', {
            url: "/addr",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/union/addr.html"
                }
            }
        })
        .state('photo', {
            url: "/photo",
            views: {
                "subBarView" : {
                    templateUrl: "./views/sub-bar.html"
                },
                "contentView" : {
                    templateUrl: "./views/union/photo.html"
                }
            }
        });
}]);


/*
// Configuring $translateProvider
app.config(['$translateProvider', 'config', function($translateProvider, config) {
    var i18nPath = config.contextPath + '/i18n';

    // configures staticFilesLoader
    $translateProvider.useStaticFilesLoader({
        prefix: i18nPath + '/locale-',
        suffix: '.json'
    });

    // load 'en' table on startup
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
    //$translateProvider.useLocalStorage();
}]);*/
