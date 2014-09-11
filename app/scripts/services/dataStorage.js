'use strict';

nsesh.factory('dataStorage', [function() {
    var storage = {
    };

    var exports;

    exports = {
        get: function(key) {
            return storage[key];
        },
        set: function(key, value) {
            storage[key] = value;
        },
        data: function() {
            return storage;
        }
    };

    return exports;
}]);


admin.factory('dataStorage', [function() {
    var storage = {
    };

    var exports;

    exports = {
        get: function(key) {
            return storage[key];
        },
        set: function(key, value) {
            storage[key] = value;
        },
        data: function() {
            return storage;
        }
    };

    return exports;
}]);
