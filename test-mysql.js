/**
 * Created with JetBrains WebStorm.
 * User: I077479
 * Date: 7/8/14
 * Time: 9:40 PM
 * To change this template use File | Settings | File Templates.
 */
var Client = require('mysql').Client;
var client = new Client();
client.host = 'localhost';
client.port = 3306;
client.user = 'root';
client.password = 'root';
client.database='nsesh';

query(client);

function query(client){
    client.query(
        'select * from weekschedule',
        function(err,res,fields){
            console.log(res);
            client.end();
        }
    );
};