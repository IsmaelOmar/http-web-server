#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const url = require('url');
var port = process.argv[2];
var pathToHTMLFiles = process.argv[3]

if(port === undefined || pathToHTMLFiles === undefined){
    port=3000;
    pathToHTMLFiles='./src/html';
}
if(!fs.existsSync(pathToHTMLFiles)){
    console.log(`WARNING: The path to your html files, which is: \n ${pathToHTMLFiles} \n does not exist, please enter a path that exists!`);
    console.log(`If you haven't stated a path to your html files then by default, \n the server will look in the current directory in the path './src/html'`)
    console.log('Please refer to the readme at https://github.com/IsmaelOmar/http-web-server')
    process.exit(1)
}

const pathEditor = function(routePath){
    if(!routePath.includes(".html")){
        return routePath + '.html';
    } else {
        return routePath;
    }
        
}

const server = http.createServer(function(req, res){


        const urlObject = url.parse(req.url);
        const htmlFile = pathToHTMLFiles + path(urlObject.pathname);
        
        console.log('Location of HTML file  ------------------ ' + htmlFile)
        console.log('Path Entered into Browser ------------------ ' + urlObject.pathname)

        if(urlObject.pathname === '/'){
        fs.readFile(pathToHTMLFiles + urlObject.pathname + 'index.html', function(error, data){
            if(error){
                res.writeHead(404);
                res.write('404: Page Not Found')
            } else {
                res.writeHead(200, {'Content-type': 'text/html'})
                res.write(data);
            }
            res.end()
        })
    } else {
        fs.readFile(htmlFile, function(error, data){
            if(error){
                res.writeHead(404);
                res.write('404: Page Not Found');
            } else {
                res.writeHead(200, {'Content-type':'text/html'})
                res.write(data);
            }
            res.end();
        });
    }
})

server.listen(port, function(error){
    if(error){
        console.log('Something Went Wrong', error)
    } else {
        console.log(`HTTP Web Server Running! Listening on Port ${port} \n Go to localhost:${port}, to see your webpages`)
    }
})