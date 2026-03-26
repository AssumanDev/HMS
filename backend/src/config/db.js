const mysql = require('mysql2/promise');

const pool =mysql.createPool({
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME

});

pool.getConnection()
            .then(connection =>{
                console.log('database connected successfully');
                connection.release();
            })

.catch(err=>{
    console.log('error is connected successfuly!');

});

module.export = pool;