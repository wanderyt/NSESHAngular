/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/10/14
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */
var MYSQL = require('mysql');
var NSESH_CONNECTION = MYSQL.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'nsesh'
});

var mysqlExports = {};

function reconnect() {
    NSESH_CONNECTION = MYSQL.createConnection({
        host     : 'localhost',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'nsesh'
    });
}

function handleQuery(SQL, cb) {
    NSESH_CONNECTION.query(SQL, function(err, results, fields) {
        if(err) {
            console.log(err.code);
            reconnect();
            cb({
                err : err
            });
        } else {
            console.log(results);
            cb({
                results : results
            });
        }
    });
}

function getWeekSchedules(cb) {
    var SQL = 'SELECT * FROM WEEKSCHEDULE';
    handleQuery(SQL, cb);
}

function getAllActivityPhoto(cb) {
    var SQL = 'SELECT * FROM ACTIVITYPHOTO';
    handleQuery(SQL, cb);
}

function getAllTypes(cb) {
    var SQL = 'SELECT DISTINCT PHOTOCATEGORY FROM ACTIVITYPHOTO';
    handleQuery(SQL, cb);
}

function getAllActivityPhotoByType(cb, params) {
    var SQL = 'SELECT * FROM activityPhoto where photoCategory = ?';
    var inserts = [params.type];
    SQL = MYSQL.format(SQL, inserts);
    handleQuery(SQL, cb);
}

function getOneActivityPhotoByType(cb, params) {
    var SQL = 'SELECT * FROM ACTIVITYPHOTO WHERE PHOTOCATEGORY = ? LIMIT 0,1';
    var inserts = [params.type];
    SQL = MYSQL.format(SQL, inserts);
    handleQuery(SQL, cb);
}

var messageBundle = {
    ECONNREFUSED : 'Cannot connect to the database.',
    PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR : 'Fatal Connection Error To Database'
};

mysqlExports = {
    messageBundle : messageBundle,
    getWeekSchedules : getWeekSchedules,
    getAllActivityPhoto : getAllActivityPhoto,
    getAllTypes : getAllTypes,
    getAllActivityPhotoByType : getAllActivityPhotoByType,
    getOneActivityPhotoByType : getOneActivityPhotoByType
};

module.exports = mysqlExports;