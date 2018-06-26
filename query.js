function handler(request, response, url){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write(url);
    response.end();
}

module.exports = {handler: handler};

