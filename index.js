const mysql = require('mysql');
const pingTime = 1000 * (60 * 15 - 5);
const connectionParameters = {
    host: 'testconnection_mysql',
    user: 'myuser',
    password: 'mypass', 
    database: 'mydatabase',
    port: '3306',
};
const checkConnection = async (mysqlClient) => {
    const results = await new Promise((resolve) => mysqlClient.query("SELECT 1", (err, results) => {
           if(err) throw err;
	   resolve(results);
    }));
    console.log(new Date(), "Success:", results);
    setTimeout(()=>checkConnection(mysqlClient), pingTime);
};
const run = async () => {
    // Give time for MySQL Service to warm up
    await new Promise(resolve => setTimeout(()=>resolve(), 10000));

    const mysqlClient = mysql.createConnection(connectionParameters);
    await new Promise((resolve, reject) => mysqlClient.connect((e) => {
      if (e) {
         reject(e);
         return;
      }
      resolve();
    }));

    try {
    await checkConnection(mysqlClient);
    } catch (e) {
        console.log(new Date(), "Error:", e);
    }
};
run();
