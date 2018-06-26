// Imported Modules
var {Client} = require("pg");
var dbInfo = require("./dbInfo.js");

// DB connect string
var connect = "postgres://_username:_password@localhost/_dbName";
connect = connect.replace("_username", dbInfo.username).replace("_password", dbInfo.password).replace("_dbName", dbInfo.database);
const db = new Client({connectionString: connect});
db.connect();



function handler(request, response, query){
    db.query('SELECT * FROM recipes', (err, data) => {
        if (err) {return console.error("Error running query",err)};
        goodQuery(request, response, data);
        //db.end();
    });
}

function goodQuery(request, response, data){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(JSON.stringify(data.rows));
    response.end();
    //db.end();
}

function badQuery(request, response){
    response.writeHead(400, {"Content-Type": "text"});
    response.write("Bad Query");
    response.end();
    //db.end();
}

module.exports = {handler: handler};

