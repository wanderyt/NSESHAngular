/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/8/14
 * Time: 9:40 PM
 * To change this template use File | Settings | File Templates.
 */
var mysql      = require('mysql');
var database   = 'nsesh';
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'nsesh'
});

connection.connect();

connection.query('select * from WEEKSCHEDULE', function(err, results, fields) {
    if(err) {
        console.log(err.message);
        throw err;
    } else {
        console.log(results[0]);
        console.log(fields);
    }
})

connection.end();