// Imported Modules
var {Client} = require("pg");
var dbInfo = require("./dbInfo.js");

// DB connect string
var connect = "postgres://_username:_password@localhost/_dbName";
connect = connect.replace("_username", dbInfo.username).replace("_password", dbInfo.password).replace("_dbName", dbInfo.database);
const db = new Client({connectionString: connect});
db.connect();



function handler(request, response, query){
    if(query == "?getRecipes"){
        db.query('SELECT * FROM recipes', (err, data) => {
            if (err) {return console.error("Error running query",err)};
            goodQuery(request, response, data);
            //db.end();
        });
    }
    else if( query.indexOf("?add=") == 0){
        var cmd = "INSERT INTO recipes ( name, ingredients, directions ) VALUES ( '_name', '_ingredients', '_directions')";
        var info = query.substr(5).split("+");
        cmd = cmd.replace("_name", decodeURI(info[0]) ).replace("_ingredients", decodeURI(info[1]) ).replace("_directions", decodeURI(info[2]) );
        db.query(cmd, (err,data) => {
            if (err) {return console.error("Error running query",err)};
            goodQuery(request, response, data);
        });
    }
    else if(query.indexOf("?delete=") == 0 ){
        var id = query.substr(8);
        var cmd = "DELETE FROM recipes WHERE id= " + id;
        db.query(cmd, (err,data)=>{
            if (err) {return console.error("Error running query",err)};
            goodQuery(request, response, data);
        });
    }
    else{
        badQuery(request,response);
    }
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

