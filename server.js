var http = require("http");
var static = require("node-static");
var url = require("url");
//var fs = require("fs");
var query = require("./query.js");

// Create a request handler for the server
var reqServer = http.createServer(handler);

// Create a node-static server instance to serve the './public' folder
var fileServer = new static.Server('./public/html');



function handler( request , response ){
    request.addListener( 'end', () => {
        // response.writeHead(200,{'Content-Type':'text/plain'});
        // response.write("hello world!");
        // response.end();

        // Get the url of the request
        url = request.url;
        console.log(url);

        if(url.indexOf("/query") == 0){
            // Serve the query
            console.log(query);
            query.handler( request, response, url);
        }
        else{
            // Serve the static File
            fileServer.serve(request,response, (e,res) => {
                if( e && e.status === 404 ){
                    fileServer.serveFile("/not-found.html",404,{},request,response);
                }
            });
        }
    }).resume();
}

reqServer.listen(3000);