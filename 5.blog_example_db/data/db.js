const mysql = require('mysql2');
const config = require('./config');

// DB Connection
const connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if (err) {
        return console.log(err);
    }
    console.log("MySQL connection is done");
    
});


module.exports=connection.promise();